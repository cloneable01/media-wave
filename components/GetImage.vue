<!-- <template>
  <div :class="className">
    <img :src="getImageUrl()" :alt="altText" />
  </div>
</template>

<script>
export default {
  props: {
    imageName: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      required: false,
    },
  },
  methods: {
    getImageUrl() {
      return require(`@/assets/images/${this.imageName}`);
    },
  },
  name: "GetImage",
};
</script> -->
