<template>
	<q-item v-ripple clickable exact :to="link" class="q-ma-sm navigation-item">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ title }}</q-item-label>
			<q-item-label v-if="caption" caption>
				{{ caption }}
			</q-item-label>
		</q-item-section>
	</q-item>
	<q-separator v-if="separator" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'EssentialLink',
	props: {
		title: {
			type: String,
			required: true,
		},

		caption: {
			type: String,
			default: '',
		},

		link: {
			type: String,
			default: '#',
		},

		icon: {
			type: String,
			default: '',
		},

		separator: {
			type: Boolean,
			default: false,
		},
	},
});
</script>
