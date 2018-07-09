<template>
	<div :class="[ 'category-icon', classes ]">
		<span v-if="classes === 'category-sostenible'">
			<img class="palmtree" svg-inline src="../../../images/icons/icon-palmtree.svg" alt="Icona de una palmera" />
		</span>
		<span v-if="classes === 'category-persones'">
			persones
		</span>
		<span v-if="classes === 'category-barris'">
			<img class="tower" svg-inline src="../../../images/icons/icon-tower.svg" alt="Icona de una torre" />
		</span>
		<span v-if="classes === 'category-cultural'">
			<img class="micalet" svg-inline src="../../../images/icons/icon-micalet.svg" alt="Icona del Micalet" />
		</span>
		<span v-if="classes === 'category-participativa'">
			participativa
		</span>
	</div>
</template>

<script>
export default {
	name: 'menu-icon',

	props: {
		classes: String
	}
};
</script>