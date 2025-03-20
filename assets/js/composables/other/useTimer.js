import { computed, ref } from "vue";

const useTimer = init_time => {
  let interval = null;
  const remaining_time = ref(init_time);
  const display_time = ref("00:00");
  const remaining_percent = ref(100);

  const decorate = num => {
    if (num < 10) return "0" + num;
    return num;
  };

  const is_timer_finished = computed(() => {
    return remaining_time.value <= 0;
  });

  const make_display_time = () => {
    const min = Math.floor((remaining_time.value % (60 * 60)) / 60);
    const sec = Math.floor(remaining_time.value % 60);

    display_time.value = decorate(min) + ":" + decorate(sec);
  };

  const make_remaining_percent = () => {
    remaining_percent.value = (remaining_time.value / init_time) * 100;
  };

  const pause_timer = () => {
    clearInterval(interval);
  };

  const restart_timer = () => {
    clearInterval(interval);
    remaining_time.value = init_time;
    start_timer();
  };

  const start_timer = () => {
    make_display_time();

    interval = setInterval(() => {
      remaining_time.value--;
      make_display_time();
      make_remaining_percent();

      if (remaining_time.value <= 0) clearInterval(interval);
    }, 1000);
  };

  return {
    display_time,
    remaining_percent,
    is_timer_finished,
    start_timer,
    pause_timer,
    restart_timer,
  };
};

export default useTimer;
