const template = [
	[
		'core/columns',
		{
			className: 'cta__columns',
		},
		[
			[
				'core/column',
				{
					width: 80,
					className: 'cta__column--main',
				},
				[
					[
						'core/paragraph',
						{
							className: 'cta__paragraph',
							placeholder:
								'Duis aute irure dolor in reprehenderit in voluptate velit.',
						},
					],
				],
			],
			[
				'core/column',
				{
					width: 20,
					className: 'cta__column--side',
				},
				[
					[
						'core/button',
						{
							className: 'cta__button',
							text: 'Call To Action',
						},
					],
				],
			],
		],
	],
];

export default template;
