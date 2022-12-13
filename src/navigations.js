export const navigations = [
	{
		name: 'Entities',
		path: '/',
		icon: 'dashboard',
		children: [
			{
				name: 'facilities',
				path: '/facilities',
				iconText: 'A',
			},
			{
				name: 'store',
				path: '/store',
				iconText: 'A',
			},
			{
				name: 'customer',
				path: '/customer',
				iconText: 'A',
			},
			{
				name: 'allowedtoppings',
				path: '/allowedtoppings',
				iconText: 'A',
			},
			{
				name: 'menu',
				path: '/menu',
				iconText: 'A',
			},
			{
				name: 'storemenu',
				path: '/storemenu',
				iconText: 'A',
			},
			{
				name: 'order',
				path: '/order',
				iconText: 'A',
			},
		],
	},
	{
		name: 'Capstone',
		path: '/',
		icon: 'menu',
		children: [
			{
				name: 'Find a Store',
				path: '/find-a-store',
				iconText: 'A',
			},
			{
				name: 'Menu list',
				path: '/store/:id',
				iconText: 'A',
			},
		]
	}
]
