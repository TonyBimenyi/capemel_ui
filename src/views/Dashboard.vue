<template>
    <div  class="dashboard-container">
        <section class="home-section">
   
    <div class="home-content">
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Districts</div>
            <div class="number">{{this.$store.state.dashboard}}</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Nombre des districts</span>
            </div>
          </div>
          <i class='bx bx-cart-alt cart'></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Paroisses</div>
            <div class="number">{{this.$store.state.paroisse_count}}</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Nombres des paroisses</span>
            </div>
          </div>
          <i class='bx bxs-cart-add cart two' ></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Membres</div>
            <div class="number">{{this.$store.state.membre_count}}</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Nombre des Membres</span>
            </div>
          </div>
          <i class='bx bx-cart cart three' ></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Pensionnés</div>
            <div class="number">{{this.$store.state.pension_count}}</div>
            <div class="indicator">
              <i class='bx bx-down-arrow-alt down'></i>
              <span class="text">Nombre des Pensionnés</span>
            </div>
          </div>
          <i class='bx bxs-cart-download cart four' ></i>
        </div>
      </div>
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Cotisations</div>
            <div class="number">{{money(this.$store.state.cotisation_total[0]?.cotisation_total)}} F</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Montant Total des cotisations</span>
            </div>
          </div>
          <i class='bx bx-cart-alt cart'></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Non Payes</div>
            <div class="number">38,876</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Montant total des pensions</span>
            </div>
          </div>
          <i class='bx bxs-cart-add cart two' ></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Profit</div>
            <div class="number">$12,876</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class='bx bx-cart cart three' ></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Return</div>
            <div class="number">11,086</div>
            <div class="indicator">
              <i class='bx bx-down-arrow-alt down'></i>
              <span class="text">Down From Today</span>
            </div>
          </div>
          <i class='bx bxs-cart-download cart four' ></i>
        </div>
      </div>

      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Cotisations Recentes</div>
          <div class="sales-details">
            <ul class="details">
              <li class="topic">Date</li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
            </ul>
            <ul class="details">
            <li class="topic">Customer</li>
            <li><a href="#">Alex Doe</a></li>
            <li><a href="#">David Mart</a></li>
            <li><a href="#">Roe Parter</a></li>
            <li><a href="#">Diana Penty</a></li>
            <li><a href="#">Martin Paw</a></li>
            <li><a href="#">Doe Alex</a></li>
            <li><a href="#">Aiana Lexa</a></li>
            <li><a href="#">Rexel Mags</a></li>
             <li><a href="#">Tiana Loths</a></li>
          </ul>
          <ul class="details">
            <li class="topic">Sales</li>
            <li><a href="#">Delivered</a></li>
            <li><a href="#">Pending</a></li>
            <li><a href="#">Returned</a></li>
            <li><a href="#">Delivered</a></li>
            <li><a href="#">Pending</a></li>
            <li><a href="#">Returned</a></li>
            <li><a href="#">Delivered</a></li>
             <li><a href="#">Pending</a></li>
            <li><a href="#">Delivered</a></li>
          </ul>
          <ul class="details">
            <li class="topic">Total</li>
            <li><a href="#">$204.98</a></li>
            <li><a href="#">$24.55</a></li>
            <li><a href="#">$25.88</a></li>
            <li><a href="#">$170.66</a></li>
            <li><a href="#">$56.56</a></li>
            <li><a href="#">$44.95</a></li>
            <li><a href="#">$67.33</a></li>
             <li><a href="#">$23.53</a></li>
             <li><a href="#">$46.52</a></li>
          </ul>
          </div>
          <div class="button">
            <a href="#">See All</a>
          </div>
        </div>
        <div class="top-sales box">
          <div class="title">Top Cotisations/membres</div>
          <ul class="top-sales-details">
            <li>
            <a href="#">
              <!--<img src="images/sunglasses.jpg" alt="">-->
              <span class="product">Vuitton Sunglasses</span>
            </a>
            <span class="price">$1107</span>
          </li>
          <li>
            <a href="#">
               <!--<img src="images/jeans.jpg" alt="">-->
              <span class="product">Hourglass Jeans </span>
            </a>
            <span class="price">$1567</span>
          </li>
          <li>
            <a href="#">
             <!-- <img src="images/nike.jpg" alt="">-->
              <span class="product">Nike Sport Shoe</span>
            </a>
            <span class="price">$1234</span>
          </li>
          <li>
            <a href="#">
              <!--<img src="images/scarves.jpg" alt="">-->
              <span class="product">Hermes Silk Scarves.</span>
            </a>
            <span class="price">$2312</span>
          </li>
          <li>
            <a href="#">
              <!--<img src="images/blueBag.jpg" alt="">-->
              <span class="product">Succi Ladies Bag</span>
            </a>
            <span class="price">$1456</span>
          </li>
          <li>
            <a href="#">
              <!--<img src="images/bag.jpg" alt="">-->
              <span class="product">Gucci Womens's Bags</span>
            </a>
            <span class="price">$2345</span>
            </li>
          <li>
            <a href="#">
              <!--<img src="images/addidas.jpg" alt="">-->
              <span class="product">Addidas Running Shoe</span>
            </a>    
            <span class="price">$2345</span>
          </li>
<li>
            <a href="#">
             <!--<img src="images/shirt.jpg" alt="">-->
              <span class="product">Bilack Wear's Shirt</span>
            </a>
            <span class="price">$1245</span>
          </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
<ChartComponent/>
    </div>
</template>
<script>
import axios from 'axios';
import ChartComponent from '@/components/ChartComponent.vue';
export default {
  components:{
    ChartComponent
  },
  data(){
    return{
      allData:[]
    }
  },
  methods:{
    DistrictCount(){
      axios
            .get(this.url+'district_count')
            .then((res)=>{
                this.$store.state.dashboard = res.data
                this.allData = res.data
            })
    },
    ParoisseCount(){
      axios
            .get(this.url+'paroisse_count')
            .then((res)=>{
              this.$store.state.paroisse_count = res.data
                this.allData = res.data
            })
    },
    MembreCount(){
      axios
            .get(this.url+'membre_count')
            .then((res)=>{
              this.$store.state.membre_count = res.data
                this.allData = res.data
            })
    },
    PensionCount(){
      axios
            .get(this.url+'pension_count')
            .then((res)=>{
              this.$store.state.pension_count = res.data
                this.allData = res.data
            })
    },
    CotisationTotal(){
      axios
            .get(this.url+'cotisation_total')
            .then((res)=>{
              this.$store.state.cotisation_total = res.data
                this.allData = res.data
            })
    },
  },
  mounted(){
    this.DistrictCount()
    this.ParoisseCount()
    this.MembreCount()
    this.PensionCount()
    this.CotisationTotal()
  },
  computed:{
        dashboard(){
            const dashboard = this.$store.state?.dashboard
            return dashboard
        },
        paroisse_count(){
            const paroisse_count = this.$store.state?.paroisse_count
            return paroisse_count
        },
        membre_count(){
            const membre_count = this.$store.state?.membre_count
            return membre_count
        },
        pension_count(){
            const pension_count = this.$store.state?.pension_count
            return pension_count
        },
        cotisation_total(){
            const cotisation_total = this.$store.state?.cotisation_total
            return cotisation_total
        }
    }
  
}
</script>
<style src='../assets/css/dashboard.css' scoped>

</style>