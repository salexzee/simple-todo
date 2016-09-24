var todo = (function() {
  'use strict'

  return {
    cacheDom: function() {
      this.$document = $(document)
      this.$noTodos = $('.no-todos')
      this.$panel = $('.panel-todo')
      this.$list = this.$panel.find('.list-group')
      this.$submit = this.$panel.find('.btn-submit')
      this.$input = this.$panel.find('.text')
    },

    checkIfTodos: function() {
      return this.$panel.find('.list-group li').length > 0 ? true : false
    },

    clearInput: function() {
      this.$input.val('')
    },

    clickBind: function() {
      this.$panel.delegate('.btn-complete', 'click', function() {
        $(this).text('completed').attr('disabled', 'disabled').parent().addClass('completed')
      })

      this.$panel.delegate('.btn-erase', 'click', function() {
        $(this).parent().remove()
      })

      this.$panel.delegate('.btn-erase', 'click', this.setNoTodoState.bind(this))

      this.$submit.on('click', this.submitInput.bind(this))
    },

    readyBind: function() {
      this.$document.ready(this.setNoTodoState.bind(this))
    },

    createPanel: function(text) {
      let html
      html = '<li class="item list-group-item">'
      html +=   text
      html +=   '<button class="btn btn-danger pull-right btn-xs btn-erase">erase</button>'
      html +=   '<button class="btn btn-success pull-right btn-xs btn-complete">complete</button>'
      html += '</li>'
      return html
    },

    addInputError: function() {
      this.$input.parent().addClass('has-error')
    },

    removeInputError: function() {
      this.$input.parent().removeClass('has-error')
    },

    displayNoTodos: function() {
      this.$noTodos.fadeIn()
    },

    hideNoTodos: function() {
      this.$noTodos.hide()
    },

    setNoTodoState: function() {
      if (this.checkIfTodos()) {
        this.hideNoTodos()
      } else {
        this.displayNoTodos()
      }
    },

    submitInput: function(event) {
      event.preventDefault()
      let html
      if (this.validate()) {
        this.removeInputError()
        html = this.createPanel(this.$input.val())
        this.$list.prepend(html)
        this.clearInput()
        this.setNoTodoState()
      } else {
        this.addInputError()
      }
    },

    validate: function() {
      return this.$input.val().length > 5 ? true : false
    },

    init: function() {
      console.log('Todo initialized')
      this.cacheDom()
      this.clickBind()
      this.readyBind()
    }
  }

})()

todo.init()
