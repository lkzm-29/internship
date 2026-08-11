terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

module "melior" {
  source      = "./modules/melior-infra"
  environment = var.environment
  location    = var.location
}

output "app_url" {
  value = module.melior.app_url
}
