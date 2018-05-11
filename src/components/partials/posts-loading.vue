<template>
	<div>
		<div v-for="(post, index) in 4" :key="index" class="post-container container">
			<div class="band"></div>
			<div class="loading">
				<div class="heading">
					<span class="filler"></span>
				</div>
				<div class="subheading">
					<span class="filler"></span>
					<span class="filler" style="width: 60%"></span>
					<span class="filler" style="width: 80%"></span>
					<span class="filler" style="width: 70%"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'posts-loading'
}
</script>
