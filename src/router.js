import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import Example from './views/Example.vue'

import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(to, from, next) {
        store
          .dispatch('event/fetchEvent', to.params.id)
          .then(event => {
            to.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      // Here's the new catch all route
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '/example',
      name: 'example',
      component: Example
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
