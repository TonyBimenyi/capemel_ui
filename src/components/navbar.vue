<template>
    <div class="container">
        <head>
    <meta charset="UTF-8">
   <!-- <title> Responsive Drop Down Navigation Menu | CodingLab </title>-->
    <link rel="stylesheet" href="style.css">
    <!-- Boxicons CDN Link -->
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
<body>
  <nav>
    <div class="navbar">
      <i class='bx bx-menu'></i>
      <div class="logo"><a>CAPEML</a></div>
      <div class="nav-links">
        <div class="sidebar-logo">
          <span class="logo-name">CAPEML</span>
          <i class='bx bx-x' ></i>
        </div>
        
        <ul class="links">
          <li> <router-link active-class="active" exact style="text-decoration:none" to="/">TABLEAU DE BORD</router-link></li>
          <li active-class="active" exact v-if="this.$store.state.user.user.role=='Coordinateur'">
            <a>EGLISE</a>
            <i class='bx bxs-chevron-down htmlcss-arrow arrow  '></i>
            <ul class="htmlCss-sub-menu sub-menu">
              <!-- <li><a>Conferences</a></li> -->
              <router-link  to="/conferences"><li><a>Conferencens</a></li></router-link>
              <router-link active-class="active" exact to="/districts"><li><a>Districts</a></li></router-link> 
              <router-link active-class="active" exact to="/paroisses"><li><a>Paroisses</a></li></router-link> 
              <!-- <li class="more">
                <span><a>More</a>
                <i class='bx bxs-chevron-right arrow more-arrow'></i>
              </span>
                <ul class="more-sub-menu sub-menu">
                  <li><a>Neumorphism</a></li>
                  <li><a>Pre-loader</a></li>
                  <li><a>Glassmorphism</a></li>
                </ul>
              </li> -->
            </ul>
          </li>
          <li>
            <router-link active-class="active" exact to="/membres"> MEMBRES</router-link>
            
          </li>
          <li> <router-link active-class="active" exact style="text-decoration:none" to="/cotisations">COTISATIONS</router-link> </li>
          <li><router-link active-class="active" exact style="text-decoration:none" to="/abandons">ABANDONS</router-link></li>
          <li><router-link active-class="active" exact style="text-decoration:none" to="/pensions">PENSIONS</router-link></li>
          <li v-if="this.$store.state.user.user.role=='Coordinateur'"><router-link  active-class="active" exact style="text-decoration:none" to="/categories">CATEGORIES</router-link></li>
          
        </ul>
      </div>
      <div class="account">
        
        <div class="account-links">
            <ul class="s">
                <li>
            <i id="cercle" class='bx bxs-user-circle'></i>
            <a id="name">{{user}}</a><br>
                  
            <i id="dot" class='bx bxs-circle'></i> 
            <i class='bx bxs-chevron-down js-arrow arrow '></i>
            <small style="font-size:12px;font-weight:400">{{this.$store.state.user.user.role}}</small>     
            <ul class="js-sub-menu sub-menu">
              <!-- <li><a>Modifier Profil</a></li> -->
              <router-link to="/users"><li><a href="">Utilisateurs</a></li></router-link> 
              <li @click="logout()"><a  style="color:red" href="">Deconnexion</a></li>

            </ul>
          </li>
            </ul>
        </div>
      </div>
 
    </div>
  </nav>
  <router-view></router-view>
  <!--<script src="script.js"></script>-->
  <div class="footer">
      <footer>
         <p>CAPEMEL--- <span style="font-size:13px">&#169</span> {{ annee }} tous les droits sont reservés</p>
      </footer>
  </div>
</body>
    </div>
</template>
<script>
export default {
    data(){
      return{
        annee:new Date().getFullYear(),
      }
    },
    methods:{
      logout(){
        localStorage.removeItem('user')
        this.$router.push('/users')
      }
    },
    computed:{
      user(){
        return this.$store.state.user.user.email
      }
    },  

    mounted(){
                // search-box open close js code
        let navbar = document.querySelector(".navbar");
        let searchBox = document.querySelector(".search-box .bx-search");
        // let searchBoxCancel = document.querySelector(".search-box .bx-x");

       

        // sidebar open close js code
        let navLinks = document.querySelector(".nav-links");
        let menuOpenBtn = document.querySelector(".navbar .bx-menu");
        let menuCloseBtn = document.querySelector(".nav-links .bx-x");
        menuOpenBtn.onclick = function() {
        navLinks.style.left = "0";
        }
        menuCloseBtn.onclick = function() {
        navLinks.style.left = "-100%";
        }


        // sidebar submenu open close js code
        let htmlcssArrow = document.querySelector(".htmlcss-arrow");
        // htmlcssArrow.onclick = function() {
        // navLinks.classList.toggle("show1");
        // }
        let moreArrow = document.querySelector(".more-arrow");
        // moreArrow.onclick = function() {
        // navLinks.classList.toggle("show2");
        // }
        let jsArrow = document.querySelector(".js-arrow");
        jsArrow.onclick = function() {
        navLinks.classList.toggle("show3");
        }

            },
}
</script>
<style src='../assets/css/navbar.css' scoped>

</style>