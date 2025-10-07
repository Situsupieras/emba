# Script para agregar namespaces a las traducciones
# IMPORTANTE: Haz backup de tus archivos antes de ejecutar

# Mapeo de keys a namespaces
$supplementsKeys = @(
    'recommendationsForYou', 'basedOnYourProfile', 'allergies', 'buy',
    'benefits', 'mainBenefits', 'sideEffects', 'contraindications',
    'detailedMedicalInfo', 'medicalDisclaimer', 'seeMedicalDetails',
    'certifications', 'important', 'motherChanges', 'medicalBenefits',
    'medicalExplanations', 'recommended', 'qualityCertified', 'noToxicChemicals'
)

$commonKeys = @(
    'login', 'register', 'email', 'password', 'forgotPassword', 'logout', 'name',
    'home', 'supplements', 'guide', 'community', 'store', 'chat', 'profile',
    'week', 'trimester', 'trimesterShort', 'development', 'milestones', 'tips',
    'babySizeThisWeek', 'approxWeight', 'quickActions', 'nextAppointment',
    'loadingRealInfo', 'close', 'yes', 'no', 'priority', 'welcome',
    'add', 'all', 'cart', 'articles', 'videos', 'checklist', 'checklistOfTrimester',
    'communitySubtitle', 'confirm', 'confirmPregnancyWeek', 'customRecommendation',
    'customWeeks', 'details', 'firstTrimesterRecommendation', 'secondTrimesterRecommendation',
    'thirdTrimesterRecommendation', 'accordingToTheDateEnteredYouHave',
    'ifNotCorrectYouCanModifyItManually', 'items', 'lastMenstruationDate',
    'markTasks', 'noProductsFound', 'outOfFive', 'pregnancyWeek',
    'productDetails', 'products', 'reviews', 'searchProducts', 'seeCart',
    'selectDate', 'selectedDate', 'storeSubtitle', 'thisAllowsUsToCalculateYourPregnancyWeek',
    'tryOtherSearchTerms', 'window'
)

# Archivos a procesar
$files = Get-ChildItem -Path "src\screens\*.tsx", "src\components\*.tsx" -File

Write-Host "Procesando archivos..." -ForegroundColor Green
Write-Host ""

foreach ($file in $files) {
    Write-Host "Procesando: $($file.Name)" -ForegroundColor Cyan
    
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $changes = 0
    
    # Reemplazar keys de supplements
    foreach ($key in $supplementsKeys) {
        $pattern = "t\('$key'\)"
        $replacement = "t('supplements.$key')"
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $changes++
            Write-Host "  ✓ $key -> supplements.$key" -ForegroundColor Yellow
        }
    }
    
    # Reemplazar keys de common
    foreach ($key in $commonKeys) {
        $pattern = "t\('$key'\)"
        $replacement = "t('common.$key')"
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $changes++
            Write-Host "  ✓ $key -> common.$key" -ForegroundColor Yellow
        }
    }
    
    # Guardar si hubo cambios
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  Total cambios: $changes" -ForegroundColor Green
    } else {
        Write-Host "  Sin cambios" -ForegroundColor Gray
    }
    
    Write-Host ""
}

Write-Host "¡Proceso completado!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANTE: Verifica que todo funcione correctamente." -ForegroundColor Yellow
Write-Host "Si hay problemas, usa Git para revertir los cambios." -ForegroundColor Yellow