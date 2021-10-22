<template>
  <div class="product">
    <HeaderShayna/>
      <!-- Breadcrumb Section Begin -->
      <div class="breacrumb-section">
          <div class="container">
              <div class="row">
                  <div class="col-lg-12 ">
                      <div class="breadcrumb-text product-more text-left">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                          <span>Detail</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- Breadcrumb Section Begin -->

      <!-- Product Shop Section Begin -->
      <section class="product-shop spad page-details">
          <div class="container">
              <div class="row">
                  <div class="col-lg-12">
                      <div class="row">
                          <div class="col-lg-6">
                              <div class="product-pic-zoom">
                                  <img class="product-big-img" :src="gambarDefault" alt="" />
                              </div>
                              <div class="product-thumbs" v-if="productDetail.galleries.length > 0">
                                  <carousel class="product-thumbs-track ps-slider" :dots="false" :items="3" :nav="false">
                                      <div 
                                      v-for="screanProduct in productDetail.galleries" :key="screanProduct.id"
                                      class="pt" 
                                      @click="ganti(screanProduct.photo)" 
                                      :class="screanProduct.photo == gambarDefault ? 'active' : '' ">
                                          <img :src="screanProduct.photo" alt="" />
                                      </div>
                                  </carousel>
                              </div>
                              <div class="col-12" v-else>
                                  <p>Photo Product Belum Tersedia.</p>
                              </div>
                          </div>
                          <div class="col-lg-6 text-left">
                              <div class="product-details">
                                  <div class="pd-title">
                                      <span>{{ productDetail.type }}</span>
                                      <h3>{{ productDetail.name }}</h3>
                                  </div>
                                  <div class="pd-desc">
                                      <p v-html="productDetail.description"></p>
                                      <h4>${{ productDetail.price }}</h4>
                                  </div>
                                  <div class="quantity">
                                     <router-link to="/chart"> 
                                        <a @click="saveKeranjang(productDetail.id, productDetail.name, productDetail.price, productDetail.galleries[0].photo)" href="#" class="primary-btn pd-cart">Add To Cart</a> 
                                     </router-link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <!-- Product Shop Section End -->

      <!-- Product Related Section Begin -->
      <RelatedShayna/>
      <!-- Product Related Section Begin -->
      <FooterShayna/>

  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import axios from 'axios'

import HeaderShayna from '@/components/HeaderShayna.vue'
import FooterShayna from '@/components/FooterShayna.vue'
import RelatedShayna from '@/components/RelatedShayna.vue'

export default {
  name: "Product",
  components: {
    HeaderShayna,
    FooterShayna,
    carousel,
    RelatedShayna 
  },
  data(){
      return {
          gambarDefault:"",
          productDetail:[],
          keranjangUser:[],
      }
  },
  methods:{
      ganti: function(el){
         this.gambarDefault = el
      },
      setDataPicture(data){
          this.productDetail = data
          this.gambarDefault = data.galleries[0].photo
      },
      saveKeranjang(idProduct, nameProduct, priceProduct, photoProduct){
        let productStore = {
            'id' : idProduct,
            'name' : nameProduct,
            'price' : priceProduct,
            'photo' : photoProduct
        }
        this.keranjangUser.push(productStore);
        const parsed = JSON.stringify(this.keranjangUser);
        localStorage.setItem('keranjangUser', parsed);
      }
  },
  beforeCreate(){
      axios.get("http://127.0.0.1:8000/api/product",{ params:{ id: this.$route.params.id }})
      .then(res => (this.setDataPicture(res.data.data)))
      .catch(err => console.log(err));
  },
  created(){
      if (localStorage.getItem('keranjangUser')) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem('keranjangUser'));
      } catch(e) {
        localStorage.removeItem('keranjangUser');
      }
      }
  }
};
</script>

<style scoped>
    .pt{
    margin-right: 10px;
    }
</style>
