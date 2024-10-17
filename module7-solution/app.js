(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.filter('angularcurrency', CurrencyFilterFactory)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService', '$scope'];
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', '$filter'];


	function ToBuyController(ShoppingListCheckOffService) {
		var toBuyList = this;

		toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

		toBuyList.buyItem = function(itemIndex) {
			ShoppingListCheckOffService.buyItems(itemIndex);
		}


	}

	function AlreadyBoughtController(ShoppingListCheckOffService, $filter) {
		var boughtList = this;

		boughtList.items = ShoppingListCheckOffService.getBoughtItems();

		boughtList.getTotalPrice = function(item) {
			return item.quantity * item.pricePerItem;
		}
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var toBuyItems = [
		{
			name: "Cookies",
			quantity: 10,
			pricePerItem: 2.50
		}, 
		{
			name: "Donuts",
			quantity: 5,
			pricePerItem: 5.50

		}
		];

		var boughtItems = [];

		service.getToBuyItems = function() {
			return toBuyItems;
		}

		service.getBoughtItems = function() {
			return boughtItems;
		}

		service.buyItems = function(itemIndex) {
			boughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
			console.log(boughtItems);
		}
	}

	function CurrencyFilterFactory() {
		return function (input) {
			return "$$" + input;
		}
	}
})();