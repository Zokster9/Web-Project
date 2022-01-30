Vue.component("gallery-page", {
    template: `
    <div class="container">
		<div class="row">
			<div class="col-md-3 col-sm-6 my-4">
				<router-link to="/" tag="div" class="photography" style="position: relative">
					<img class="img-fluid mb-4" src="imgs/majmun.jpg" alt="Slicica" style="overflow: hidden; position: relative;"/>
				</router-link>
			</div>
			<div class="col-md-3 col-sm-6 my-4">
				<router-link to="/" tag="div" class="photography" style="position: relative">
					<img class="img-fluid mb-4" src="imgs/sunset.jpg" alt="Slicica" style="overflow: hidden; position: relative;"/>
				</router-link>
			</div>
			<div class="col-md-3 col-sm-6 my-4">
				<router-link to="/" tag="div" class="photography" style="position: relative">
					<img class="img-fluid mb-4" src="imgs/MONKEE.jpg" alt="Slicica" style="overflow: hidden; position: relative;"/>
				</router-link>
			</div>
			<div class="col-md-3 col-sm-6 my-4">
				<router-link to="/" tag="div" class="photography" style="position: relative">
					<img class="img-fluid mb-4" src="imgs/kako.jpg" alt="Slicica" style="overflow: hidden; position: relative;"/>
				</router-link>
			</div>
		</div>
	</div>
    `
})