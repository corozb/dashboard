// ---- BURGER MENU----------
// Set constants and grab needed elements
const $burger = document.querySelector('.burger_menu')
const $sidebar = document.querySelector('.sidebar')
const $close = document.querySelector('.close_button')

// Menu open sidenav icon, shown only on mobile
$burger.addEventListener('click', () => {
  console.log('diste clic')
  $sidebar.classList.add('active')
})

$close.addEventListener('click', () => {
  $sidebar.classList.remove('active')
})


// HIDE RESPONSIVE MENU
window.addEventListener('resize', (e)=> {
  const $width = window.innerWidth

  if ($width > 750) {
    $sidebar.classList.remove('active')
  }
})

// // ---- PROFILE MENU --------
// // User avatar dropdown functionality
const $user = document.querySelector('.persona')

$user.addEventListener('click', () => {
  const $settings = document.querySelector('.settings')
  $settings.classList.toggle('settings_active')
})

// SIDENAV
// sidenav list hidden
const $topic = document.querySelectorAll('.topic')

$topic.forEach(listItem => {
  listItem.addEventListener('click', ()=> {
  const subList = listItem.nextElementSibling
  // subList.classList.toggle('list_hidden')
  
  // Reveal/hide the sublist
  if (subList) {
    subList.classList.toggle('list_hidden')
  }
  
  // Add/remove selected styles to list category heading
  if (listItem) {
    listItem.classList.toggle('topic--open')
  }

  })
})

// ---- CHART -------------
const svg = d3.select('.showChart')
      .append('svg')
      .append('g')

// add class
svg.append('g').attr('class', 'slices')
svg.append('g').attr('class', 'labels')
svg.append('g').attr('class', 'lines')

const width = 500,
    height = 331,
    radius = Math.min(width, height) / 2

const pie = d3.layout.pie()
            .sort(null)
            .value(function(d){
              return d.value
            })

const arc = d3.svg.arc()
              .outerRadius(radius * 0.8)
              .innerRadius(radius * 0.4)

const outerArc = d3.svg.arc()
              .outerRadius(radius * 0.9)
              .innerRadius(radius * 0.9)

svg.attr('transform', 'translate('+ width / 2 +',' + height / 2 + ')')

let key = function(d) {
  return d.data.label
}

const color = d3.scale.ordinal()
              .domain(['Direct', 'Referring Sales', 'Ecommerce', 'Social Media', 'Store', 'Event', 'Inside', 'Email', 'Conferences'])
              .range(['#FC5D79', '#1BBAE1', '#E9C458', '#27ae60', '#ED1C40', 'yellow', '#76E8BA', '#75C5D1', '#71DE76'])

function randomData() {
  let labels = color.domain()
  return labels.map(function(label){
    return { label: label, value: Math.random()}
  })
}  

change(randomData())

d3.select('.btn_random')
    .on('click', function(){
      change(randomData())
    })

function change(data) {
/* ------- PIE SLICES -------*/
   var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(data), key);
    
      slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
        .attr("class", "slice");
    
      slice		
        .transition().duration(1000)
        .attrTween("d", function(d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        })
    
      slice.exit()
        .remove();

// text labels
const text = svg.select('.labels').selectAll('text')
      .data(pie(data), key)

text.enter()
    .append('text')
    .attr('dy', '.35em')
    .text(function(d){
      return d.data.label
    })

function midAngle(d){
  return d.startAngle + (d.endAngle - d.startAngle)/2
}

text.transition().duration(1000)
    .attrTween('transform', function(d) {
      this._current = this._current || d

      let interpolate = d3.interpolate(this._current, d)
      this._current = interpolate(0)

      return function(t) {
        let d2 = interpolate(t)
        let pos = outerArc.centroid(d2)

        pos[0] = radius * (midAngle(d2)< Math.PI? 1:-1)
        return 'translate('+ pos +')'
      }
    })
    .styleTween('text-anchor', function(d){
      this._current = this._current || d
      let interpolate = d3.interpolate(this._current, d)
      this._current = interpolate(0)

      return function(t) {
        let d2 = interpolate(t)
        return midAngle(d2) < Math.PI? 'start':'end'
      }
    })

    text.exit()
        .remove()

// -------- slice to text polylines------
const polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(data), key)

polyline.enter()
    .append('polyline')

polyline.transition().duration(1000)
    .attrTween('points', function(d){
      this._current = this._current || d
      let interpolate = d3.interpolate(this._current, d)
      this._current = interpolate(0)

      return function(t){
        let d2 = interpolate(t)
        let pos = outerArc.centroid(d2)
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI? 1:-1)

        return [arc.centroid(d2), outerArc.centroid(d2), pos]
      }
    })

polyline.exit()
      .remove()
}