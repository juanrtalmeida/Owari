import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './NotFound'

const routes = Object.keys(
	import.meta.glob('/src/pages/**/[a-z[]*.tsx', {
		eager: true
	})
).map((route) => {
	const path = route
		.replace(/\/src\/pages|index|\.tsx$/g, '')
		.replace(/\[\.{3}.+\]/, '*')
		.replace(/\[(.+)\]/, ':$1')
	const FileObject = import.meta.glob('/src/pages/**/[a-z[]*.tsx', {
		eager: true
	})[route] as object

	const Component = Object.values(FileObject)[0]

	return {
		component: Component,
		path
	}
})

const RouterAllRoutes = React.memo(function RouterRoutes() {
	function renderRoutes() {
		return routes.map(({ path, component: Component = Fragment }) => {
			return (
				<Route
					key={path}
					path={path}
					element={Component() as React.ReactNode}
				/>
			)
		})
	}

	return (
		<main>
			<Routes>
				{renderRoutes()}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</main>
	)
})

export { RouterAllRoutes }
