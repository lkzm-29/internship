resource "azurerm_resource_group" "rg" {
  name     = "melior-${var.environment}-rg"
  location = var.location
}

resource "azurerm_container_registry" "acr" {
  name                = "meliorregistry${var.environment}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_service_plan" "plan" {
  name                = "melior-${var.environment}-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "app" {
  name                = "melior-${var.environment}-app"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    always_on = false
    application_stack {
      docker_image_name   = "melior:latest"
      docker_registry_url = "https://${azurerm_container_registry.acr.login_server}"
    }
  }
}
