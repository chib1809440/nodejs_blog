const Course = require('../models/Course');
const { mongoosetoOject } = require('../../util/mongoose');

class CourseController {
	//[GET] /courses/:slug
	show(req, res, next) {
		Course.findOne({ slug: req.params.slug })
			.then((course) => {
				res.render('courses/show', { course: mongoosetoOject(course) });
			})
			.catch(next);
	}

	//[GET] /courses/create
	create(req, res, next) {
		res.render('courses/create');
	}

	//[POST] /courses/store
	store(req, res, next) {
		// res.send(req.body);
		req.body.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
		const course = new Course(req.body);
		course
			.save()
			.then(() => res.redirect(`/me/stored/courses`))
			.catch(next);
	}
	//[GET] /courses/:id/edit
	edit(req, res, next) {
		Course.findById(req.params.id)
			.then((course) =>
				res.render('courses/edit', { course: mongoosetoOject(course) }),
			)
			.catch(next);
	}

	//[PUT] /courses/:id
	update(req, res, next) {
		// res.json(req.body);
		Course.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect('/me/stored/courses'))
			.catch(next);
	}

	//[Delete] /courses/:id
	destroy(req, res, next) {
		Course.delete({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	//[Delete] /courses/:id/force
	forceDestroy(req, res, next) {
		Course.deleteOne({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	// [Patch] /:id/restore
	restore(req, res, next) {
		Course.restore({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	//[Post] /handel-form-action
	handelformaction(req, res, next) {
		switch (req.body.action) {
			case 'delete':
				Course.delete({ _id: { $in: req.body.courseIDs } })
					.then(() => res.redirect('back'))
					.catch(next);
				break;
			default:
				res.redirect('back');
		}
	}
}

module.exports = new CourseController();
