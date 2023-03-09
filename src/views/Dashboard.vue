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
            <div class="number">{{money(this.$store.state.cotisation_a_paye[0]?.cotisation_total-this.$store.state.cotisation_total[0]?.cotisation_total)}} F</div>
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
              <table>
                <thead>
                  <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <!-- <th>District</th> -->
                    <th>Categorie</th>
                    <th>Cotisation</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cot in recent_cot" :key="cot.id">
                    <td>{{cot.membre[0]?.matricule_membre}}</td>
                    <td>{{cot.membre[0]?.nom_membre}}</td>
                    <td>{{cot.membre[0]?.prenom_membre}}</td>
                    <td>{{cot.membre[0]?.id_categorie}}</td>
                    <td>{{money(cot.montant_paye)}}Fbu</td>
                    <td>{{cot.date_paiement}}</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="button">
            <a href="#">Voir Plus</a>
          </div>
        </div>
        <div class="top-sales box">
          <div class="title">Top Cotisations/Paroisses</div>
          <table>
            <thead>
              <tr>
                <th>Nom District</th>
                <th>Montant Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in top_cot" :key="c.id">
                <td>{{c.nom_district}}</td>
                <td>{{money(c.cotisation_total)}} Fbu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
<!-- <ChartComponent/> -->
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
    CotisationPaye(){
      axios
            .get(this.url+'cotisation_total_non_paye')
            .then((res)=>{
              this.$store.state.cotisation_a_paye = res.data
                this.allData = res.data
            })
    },
    RecentCotisation(){
      axios
            .get(this.url+'recent_cot')
            .then((res)=>{
              this.$store.state.recent_cot = res.data
                this.allData = res.data
            })
    },
    TopCotisation(){
      axios
            .get(this.url+'top_cot')
            .then((res)=>{
              this.$store.state.top_cot = res.data
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
    this.CotisationPaye()
    this.RecentCotisation()
    this.TopCotisation()
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
        },
        cotisation_a_paye(){
            const cotisation_a_paye = this.$store.state?.cotisation_a_paye
            return cotisation_a_paye
        },
        recent_cot(){
            const recent_cot = this.$store.state?.recent_cot
            return recent_cot
        },
        top_cot(){
            const top_cot = this.$store.state?.top_cot
            return top_cot
        }
    }
  
}
</script>
<style src='../assets/css/dashboard.css' scoped>

</style>