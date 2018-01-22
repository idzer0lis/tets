<template>
  <div class="heading-counter">
    <span class="counter-title">Remaining time</span>
    <span class="counter-number" v-if="daysVisible">{{d}} Days</span>
    <span class="counter-number">{{h}} Hours</span>
    <span class="counter-number">{{m}} Mins</span>
    <span class="counter-number">{{s}} Secs</span>
  </div>
</template>

<script>
  import moment from 'moment';

  const forceShowDays = true;
  const forceShowTwoDigits = true;

  export default {
    name: 'ContributeHorizontalTimer',
    props: ['contributionCountdown'],
    data() {
      const timerValues = this.calculateTimerValues(this.contributionCountdown);

      return {
        timerHandle: null,
        d: timerValues.d,
        h: timerValues.h,
        m: timerValues.m,
        s: timerValues.s,
      };
    },
    computed: {
      daysVisible: function () { return forceShowDays || parseInt(this.d, 10) > 0; },
    },
    mounted: function () {
      this.timerHandle = setInterval(() => {
        const timerValues = this.calculateTimerValues(this.contributionCountdown);
        this.d = timerValues.d;
        this.h = timerValues.h;
        this.m = timerValues.m;
        this.s = timerValues.s;
      }, 250);
    },
    beforeDestroy: function () {
      if (this.timerHandle) {
        clearInterval(this.timerHandle);
      }
    },
    methods: {
      calculateTimerValues(countdownValue) {
        let totalMilliseconds;
        try {
          totalMilliseconds = moment(countdownValue).diff(moment(), 'milliseconds');
        } catch (err) {
          totalMilliseconds = -1;
        }

        let d = '0';
        let h = '0';
        let m = '0';
        let s = '0';

        if (forceShowTwoDigits) {
          h = '00';
          m = '00';
          s = '00';
        }

        if (totalMilliseconds <= 0) {
          return {
            d, h, m, s,
          };
        }

        const duration = moment.duration(totalMilliseconds);
        d = `${Math.floor(duration.asDays())}`;
        h = `${duration.hours()}`;
        m = `${duration.minutes()}`;
        s = `${duration.seconds()}`;

        if (forceShowTwoDigits) {
          if (h.length < 2) {
            h = `0${h}`;
          }
          if (m.length < 2) {
            m = `0${m}`;
          }
          if (s.length < 2) {
            s = `0${s}`;
          }
        }

        return {
          d, h, m, s,
        };
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
