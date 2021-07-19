<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >
@import "./assets/css/header.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
* {
  padding: 0;
  margin: 0;
  border: 0;
}
/* //Used to check for element overflows */
	/* * {
    background: #000 !important;
    color: #0f0 !important;
    outline: solid #f00 1px !important;
} */
html,
body {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: #666;
  outline: none;
  cursor: pointer;
}
a:hover {
  outline: none;
}
button {
  cursor: pointer;
}
li {
  list-style: none;
}
.icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 20px;
}
/* Sets the style of the scroll bar */
::-webkit-scrollbar {
  width: 8px;
}
/* The rolling groove */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow:inset006pxrgba(0,0,0,0.3); */
  border-radius: 10px;
}
/* Scroll bar slider */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  /* -webkit-box-shadow:inset006pxrgba(0,0,0,0.5); */
}

h3 {
  font-size: 24px;
}
a {
  cursor: pointer;
}
</style>
