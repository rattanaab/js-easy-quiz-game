class Questions {
  constructor() {
    this.data = []
    this.question = {}
    this.playing = 0
    this.canAnswer = true
    this.apiUrl = 'questions.json'
    this.secondTimeOut = 5
    this.correctAnswer = 0
    this.score = 0
    this.allQuestion = 0
  }

  async init() {
    this.setUpClickEvent()
    this.data = await this.getData()
    this.allQuestion = this.data.length
    this.question = this.data[this.playing]
    this.showData()
    // if (this.playing == this.data.length) {
    //   console.log("จบโปรแกรม")
    // }else{
    //   this.showData()
    // }
    //if (this.playing == this.data.length) break;  // ไม่หยุด
  }

  setUpClickEvent() {
    let bc1 = document.getElementById('c1')
    bc1.addEventListener('click', (e) => {
      if (this.canAnswer) this.checkAnswer(1)
    })

    let bc2 = document.getElementById('c2')
    bc2.addEventListener('click', (e) => {
      if (this.canAnswer) this.checkAnswer(2)
    })

    let closeEndModal = document.getElementById('closeEndModal')
    closeEndModal.addEventListener('click', (e) => {
      this.closeEndModal()
    })
  }

  endGame() {
    let score = document.getElementById('score')
    score.innerHTML = `คะแนนของคุณคือ ${this.score} เต็ม ${this.allQuestion}`
    console.log('EndGame')
    this.openEndModal()
  }

  openEndModal() {
    const endModal = document.getElementById('endModal')
    endModal.classList.add('modal-open')
  }
  closeEndModal() {
    const endModal = document.getElementById('endModal')
    endModal.classList.remove('modal-open')
    window.location.reload()
  }

  getData() {
    return new Promise(async (resolve, reject) => {
      const config = {
        method: 'get',
        url: this.apiUrl,
      }
      axios(config)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(false)
        })
    })
  }

  showData() {
    this.setTimer()
    let question = document.getElementById('question')
    let c1 = document.getElementById('c1')
    let c2 = document.getElementById('c2')
    question.innerHTML = this.question.attributes.question
    c1.innerHTML = this.question.attributes.c1
      ? this.question.attributes.c1
      : 'ใช่'
    c2.innerHTML = this.question.attributes.c2
      ? this.question.attributes.c2
      : 'ไม่ใช่'
  }

  setTimer() {
    let j = (this.secondTimeOut * 1000) / 100
    let i = 100
    let timer = document.getElementById('timer')
    this.runningTimer = setInterval(() => {
      i--
      if (i == 0) {
        this.checkAnswer('timeout')
        clearInterval(this.runningTimer)
      }
      timer.setAttribute('value', i.toString())
    }, j)
  }

  checkAnswer(choice) {
    clearInterval(this.runningTimer)
    let answer = document.getElementById('answer')
    let c1 = document.getElementById('c1')
    let c2 = document.getElementById('c2')
    this.canAnswer = false
    answer.classList.remove('hidden')
    if (choice.toString() == this.question.attributes.answer.toString()) {
      answer.innerHTML = 'ถูกต้อง'
      answer.classList.remove('bg-red-600')
      answer.classList.add('bg-green-600')
      this.score++
    } else if (choice.toString() == 'timeout') {
      answer.innerHTML = 'หมดเวลา'
      answer.classList.remove('bg-green-600')
      answer.classList.add('bg-red-600')
    } else {
      answer.innerHTML = 'ไม่ถูกต้อง'
      answer.classList.remove('bg-green-600')
      answer.classList.add('bg-red-600')
    }

    this.goNextQuestion()
  }

  goNextQuestion() {
    setTimeout(() => {
      this.playing++
      if (this.playing == this.data.length) {
        this.endGame()
      } else {
        this.question = this.data[this.playing]
        this.canAnswer = true
        answer.classList.add('hidden')
        this.showData()
      }
    }, 1000)
  }
}
