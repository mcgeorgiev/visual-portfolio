e2e:
		{ \
		set -e ;\
		(cd ui && npm run cypress) ;\
		workon portfolio ;\
		(cd api && python manage.py runscript clear_test_data) ;\
		deactivate ;\
		}

api:
		(cd api && python manage.py runserver)

ui:
		(cd ui && npm start)


		
