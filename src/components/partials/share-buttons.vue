<template>
	<div>
		<iframe 
			:src="'https://www.facebook.com/plugins/like.php?href=' + encodeURI(shareableUrl) + '&width=154&layout=button_count&action=like&size=large&show_faces=false&share=true&height=46&appId=252515324782640'"
			class="share-buttons-facebook"
			width="154"
			height="46"
			scrolling="no"
			frameborder="0"
			allowTransparency="true"
			allow="encrypted-media"></iframe>
		<iframe 
			:src="'https://platform.twitter.com/widgets/tweet_button.html?size=l&amp;url=' + encodeURI(shareableUrl) + '&amp;via=' + twitter_account + '&amp;related=' + twitter_account + '&amp;text=' + encodeURI(tweet) + '&amp;lang=es'"
			class="share-buttons-twitter"
			width="140"
			height="37"
			allowtransparency="true"
			scrolling="no"
			frameborder="0"></iframe>
	</div>
</template>

<script>
export default {
	name: 'share-buttons',

	data() {
		return {
			shareableUrl: 'https://elcanvinopara.com',
			twitter_account: 'compromisVLC',
			tweet: 'Tweet'
		}
	}
}
</script>
