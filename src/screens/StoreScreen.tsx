import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  List,
  Searchbar,
  SegmentedButtons,
  Dialog,
  Portal,
  TextInput,
  Divider,
  Badge,
} from 'react-native-paper';
import { theme, customColors } from '../theme';
import { Product, Supplement, User } from '../types';
import { mockProducts, mockSupplements, mockUser } from '../data/mockData';
import { t } from '../config/i18n';

const { width } = Dimensions.get('window');

export default function StoreScreen() {
  const [user, setUser] = useState<User>(mockUser);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [supplements, setSupplements] = useState<Supplement[]>(mockSupplements);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [productDialogVisible, setProductDialogVisible] = useState(false);
  const [supplementDialogVisible, setSupplementDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Array<{id: string, type: 'product' | 'supplement', quantity: number}>>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const showProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogVisible(true);
  };

  const showSupplementDetails = (supplement: Supplement) => {
    setSelectedSupplement(supplement);
    setSupplementDialogVisible(true);
  };

  const addToCart = (id: string, type: 'product' | 'supplement') => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === id && item.type === type);
      if (existingItem) {
        return prev.map(item => 
          item.id === id && item.type === type 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { id, type, quantity: 1 }];
      }
    });
  };

  const getFilteredItems = () => {
    let items: Array<Product | Supplement> = [];
    
    if (selectedCategory === 'all' || selectedCategory === 'products') {
      items = [...products];
    }
    if (selectedCategory === 'all' || selectedCategory === 'supplements') {
      items = [...items, ...supplements];
    }

    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      const supplement = supplements.find(s => s.id === item.id);
      const price = product?.price || supplement?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header */}
          <Card style={styles.headerCard}>
            <Card.Content>
              <Title style={styles.headerTitle}>{t('common.store')}</Title>
              <Paragraph style={styles.headerSubtitle}>
                {t('common.storeSubtitle') || 'Productos certificados con explicaciones médicas detalladas'}
              </Paragraph>
              <View style={styles.ethicalBadges}>
                <Chip mode="outlined" style={styles.ethicalChip}>
                  {t('supplements.qualityCertified')}
                </Chip>
                <Chip mode="outlined" style={styles.ethicalChip}>
                  {t('supplements.medicalExplanations')}
                </Chip>
                <Chip mode="outlined" style={styles.ethicalChip}>
                  {t('supplements.noToxicChemicals')}
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Search and Filter */}
          <Searchbar
            placeholder={t('common.searchProducts')}
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />

          <SegmentedButtons
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            buttons={[
              { value: 'all', label: t('common.all') },
              { value: 'supplements', label: t('common.supplements') },
              { value: 'products', label: t('common.products') },
            ]}
            style={styles.categoryButtons}
          />

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Card style={styles.cartCard}>
              <Card.Content>
                <View style={styles.cartSummary}>
                  <View style={styles.cartInfo}>
                    <Title style={styles.cartTitle}>{t('common.cart') || 'Carrito'}</Title>
                    <Paragraph style={styles.cartItems}>
                      {getCartItemCount()} {t('common.items')}
                    </Paragraph>
                  </View>
                  <View style={styles.cartTotal}>
                    <Title style={styles.totalAmount}>
                      {formatPrice(getCartTotal())}
                    </Title>
                    <Button mode="contained" onPress={() => {/* Navigate to checkout */}}>
                      {t('common.seeCart')}
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Products Grid */}
          <View style={styles.productsGrid}>
            {getFilteredItems().map((item) => {
              const isSupplement = 'dosage' in item;
              
              return (
                <Card key={item.id} style={styles.productCard}>
                  <Card.Cover source={{ uri: item.image }} />
                  <Card.Content>
                    <View style={styles.productHeader}>
                      <Title style={styles.productTitle} numberOfLines={2}>
                        {item.name}
                      </Title>
                      {isSupplement && (item as Supplement).trimester.includes(user.trimester) && (
                        <Badge style={styles.recommendedBadge}>{t('supplements.recommended')}</Badge>
                      )}
                    </View>
                    
                    <Paragraph style={styles.productDescription} numberOfLines={2}>
                      {item.description}
                    </Paragraph>

                    <View style={styles.productRating}>
                      <Paragraph style={styles.ratingText}>
                        {isSupplement ? '4.5' : (item as Product).rating} 
                        ({isSupplement ? '128' : (item as Product).reviews} {t('common.reviews')})
                      </Paragraph>
                    </View>

                    <View style={styles.productPrice}>
                      <Title style={styles.priceText}>
                        {formatPrice(item.price)}
                      </Title>
                      {'originalPrice' in item && item.originalPrice && (
                        <Paragraph style={styles.originalPrice}>
                          {formatPrice(item.originalPrice)}
                        </Paragraph>
                      )}
                    </View>

                    <View style={styles.certificationsContainer}>
                      {(isSupplement ? (item as Supplement).certifications : (item as Product).certifications)
                        .map((cert) => (
                          <Chip key={cert} mode="outlined" style={styles.certificationChip}>
                            {cert}
                          </Chip>
                        ))}
                    </View>

                    <View style={styles.productActions}>
                      <Button
                        mode="outlined"
                        icon="information"
                        style={styles.actionButton}
                        onPress={() => isSupplement ? showSupplementDetails(item as Supplement) : showProductDetails(item as Product)}
                      >
                        {t('common.details')}
                      </Button>
                      <Button
                        mode="contained"
                        icon="cart"
                        style={styles.actionButton}
                        onPress={() => addToCart(item.id, isSupplement ? 'supplement' : 'product')}
                      >
                        {t('common.add')}
                      </Button>
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </View>

          {/* Empty State */}
          {getFilteredItems().length === 0 && (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Title style={styles.emptyTitle}>{t('common.noProductsFound')}</Title>
                <Paragraph style={styles.emptyText}>
                  {t('common.tryOtherSearchTerms')}
                </Paragraph>
              </Card.Content>
            </Card>
          )}
        </Animated.View>
      </ScrollView>

      {/* Product Details Dialog */}
      <Portal>
        <Dialog visible={productDialogVisible} onDismiss={() => setProductDialogVisible(false)}>
          <Dialog.Title>{t('common.productDetails')}</Dialog.Title>
          <Dialog.Content>
            {selectedProduct && (
              <ScrollView>
                <Image source={{ uri: selectedProduct.image }} style={styles.dialogImage} />
                <Title style={styles.dialogTitle}>{selectedProduct.name}</Title>
                <Paragraph style={styles.dialogDescription}>{selectedProduct.description}</Paragraph>
                
                <View style={styles.dialogRating}>
                  <Paragraph style={styles.dialogRatingText}>
                    {selectedProduct.rating} {t('common.outOfFive')} ({selectedProduct.reviews} {t('common.reviews')})
                  </Paragraph>
                </View>

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('supplements.medicalBenefits')}</Title>
                {selectedProduct.medicalBenefits.map((benefit) => (
                  <List.Item
                    key={benefit}
                    title={benefit}
                    left={(props) => <List.Icon {...props} icon="check-circle" color={customColors.success} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('supplements.certifications')}</Title>
                <View style={styles.dialogCertifications}>
                  {selectedProduct.certifications.map((cert) => (
                    <Chip key={cert} mode="outlined" style={styles.dialogCertificationChip}>
                      {cert}
                    </Chip>
                  ))}
                </View>

                <View style={styles.dialogPrice}>
                  <Title style={styles.dialogPriceText}>
                    {formatPrice(selectedProduct.price)}
                  </Title>
                  {selectedProduct.originalPrice && (
                    <Paragraph style={styles.dialogOriginalPrice}>
                      {formatPrice(selectedProduct.originalPrice)}
                    </Paragraph>
                  )}
                </View>
              </ScrollView>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setProductDialogVisible(false)}>{t('messages.close')}</Button>
            <Button 
              mode="contained" 
              onPress={() => {
                if (selectedProduct) {
                  addToCart(selectedProduct.id, 'product');
                  setProductDialogVisible(false);
                }
              }}
            >
              {t('common.add')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Supplement Details Dialog */}
      <Portal>
        <Dialog visible={supplementDialogVisible} onDismiss={() => setSupplementDialogVisible(false)}>
          <Dialog.Title>{t('supplements.detailedMedicalInfo')}</Dialog.Title>
          <Dialog.Content>
            {selectedSupplement && (
              <ScrollView>
                <Image source={{ uri: selectedSupplement.image }} style={styles.dialogImage} />
                <Title style={styles.dialogTitle}>{selectedSupplement.name}</Title>
                <Paragraph style={styles.dialogDescription}>{selectedSupplement.description}</Paragraph>

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('supplements.medicalExplanations')}</Title>
                <Paragraph style={styles.medicalExplanation}>
                  {selectedSupplement.medicalExplanation}
                </Paragraph>

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('supplements.benefits')}</Title>
                {selectedSupplement.benefits.map((benefit) => (
                  <List.Item
                    key={benefit}
                    title={benefit}
                    left={(props) => <List.Icon {...props} icon="check-circle" color={customColors.success} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('folicAcidDosage')}</Title>
                <Paragraph style={styles.dosageText}>{selectedSupplement.dosage}</Paragraph>

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('supplements.sideEffects')}</Title>
                {selectedSupplement.sideEffects.map((effect) => (
                  <List.Item
                    key={effect}
                    title={effect}
                    left={(props) => <List.Icon {...props} icon="alert" color={customColors.warning} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('supplements.certifications')}</Title>
                <View style={styles.dialogCertifications}>
                  {selectedSupplement.certifications.map((cert) => (
                    <Chip key={cert} mode="outlined" style={styles.dialogCertificationChip}>
                      {cert}
                    </Chip>
                  ))}
                </View>

                <View style={styles.dialogPrice}>
                  <Title style={styles.dialogPriceText}>
                    {formatPrice(selectedSupplement.price)}
                  </Title>
                </View>
              </ScrollView>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSupplementDialogVisible(false)}>{t('messages.close')}</Button>
            <Button 
              mode="contained" 
              onPress={() => {
                if (selectedSupplement) {
                  addToCart(selectedSupplement.id, 'supplement');
                  setSupplementDialogVisible(false);
                }
              }}
            >
              {t('common.add')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  scrollView: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 20,
    backgroundColor: customColors.babyBlue,
    borderRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    flexShrink: 1,
  },
  headerSubtitle: {
    fontSize: 15,
    marginBottom: 14,
    flexShrink: 1,
  },
  ethicalBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ethicalChip: {
    height: 28,
  },
  searchBar: {
    marginBottom: 12,
  },
  categoryButtons: {
    marginBottom: 16,
  },
  cartCard: {
    marginBottom: 16,
    backgroundColor: customColors.softYellow,
    borderRadius: 14,
    elevation: 2,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartInfo: {
    flex: 1,
  },
  cartTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  cartItems: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  cartTotal: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 19,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  recommendedBadge: {
    backgroundColor: customColors.success,
  },
  productDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
    flexShrink: 1,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 8,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: customColors.disabled,
    marginLeft: 8,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  certificationChip: {
    height: 24,
    fontSize: 11,
    paddingHorizontal: 6,
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    height: 32,
  },
  emptyCard: {
    marginTop: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
  },
  dialogImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dialogDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  dialogRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dialogRatingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 12,
  },
  dialogSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  medicalExplanation: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  dosageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  dialogCertifications: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dialogCertificationChip: {
    marginBottom: 4,
  },
  dialogPrice: {
    alignItems: 'center',
    marginTop: 16,
  },
  dialogPriceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  dialogOriginalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: customColors.disabled,
  },
}); 