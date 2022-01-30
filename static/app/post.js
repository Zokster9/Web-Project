Vue.component("post-ui", {
    template:`
	<div>
		<main-navbar></main-navbar>
		<div class="post d-flex justify-content-center shadow" style="margin:auto;margin-top:100px;width:90vw;height:80vh;border-radius: 20px;overflow: hidden;">
			<div class="post-image" style="height:100%;width:65vw;background-color: black;">
				<img src="imgs/download.jpg" alt="Posted img idk fuck me" style="width:100%;height:100%;object-fit:contain;overflow:hidden;object-position:center;">
			</div>
			<div class="post-sidebar" style="width:25vw;height:100%;background-color: white;">
				<profile-picture-details></profile-picture-details>
				<div class="post-text" style="margin-left: 10px;margin-right: 5px;">
					<p class="font-weight-normal fs-5">
						Aenean s
					</p>
				</div>
				<hr>
				<div style="height:60vh;">
					<post-comments></post-comments>
				</div>
			</div>
		</div>
	</div>
    `
})

