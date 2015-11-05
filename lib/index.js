const _ = require('lodash')
const async = require('async')
const boba = require('boba')

module.exports = {
  autoScaffold: (input, done) => {
    const missingKeys = _(input).filter(_.isEmpty).keys().value()
    if (missingKeys.length) throw new Error('missing' + missingKeys.join(', '))

    console.log('scaffolding...')
    boba({
      src: input.templateDir,
      dest: input.dest,
      opts: {
        blacklist: ['.DS_Store'],
        sandbox: input.answers,
        key: input.answers.answers
      }
    }, (err, res) => {
      if (err) return done(err)
      done()
    })
  },

  runActions: (input, done) => {
    const answers = _.clone(input.answers.answers)
    async.forEachOfSeries(answers, (answer, question, cb) => {
      async.eachSeries([].concat(answer), (reply, callback) => {
        input.actions[question][reply](callback)
      }, cb)
    }, done)
  }
}
