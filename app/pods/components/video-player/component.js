import Ember from 'ember';

export default Ember.Component.extend({
  playbackRate:1,
  toggle: true,
  didInsertElement() {
    this._super(...arguments)
    const video = this.$('#video')[0]
    const self = this;
    const config = {
      xhrSetup (xhr, url) {

        // TODO: send a request to backend and get a signed url to the segment as 301

        try {
          const awsData = self.get('awsData')
          const encoded = Ember.$.param({
            "Key-Pair-Id": awsData.keyId,
            "Signature": awsData.signature,
            "Policy": awsData.policyString
          })
          console.log(url, encoded);
          xhr.open('GET', `${url}?${encoded}`, true)
        } catch(e) {
          console.error(e)
        }
      }
    }
    const hls = new Hls(config)
    window.h = hls
    hls.loadSource(this.get('src'))
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    })
  },

  actions:{
     changeSpeed(val){
         const rate = this.get('playbackRate')+val;
         const video = this.$('#video')[0];
         if(rate<=3 && rate>=0.5){
     	    video.playbackRate = rate;
	        this.set('playbackRate',rate);
         }
     }

  }
});
