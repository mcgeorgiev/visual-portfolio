import os
import time
import unittest
import uuid

from selenium import webdriver

class CreateAccountTest(unittest.TestCase):

    def setUp(self):
        executable_path = "/usr/local/bin/chromedriver"
        os.environ["webdriver.chrome.driver"] = executable_path

        self.browser = webdriver.Chrome(executable_path=executable_path)
        self.live_server_url = 'http://127.0.0.1:8000'
        self.URL = 'http://127.0.0.1:8080'
        self.email = "{}@email.com".format(uuid.uuid4().hex)
        self.password = "secret-password"


    def tearDown(self):
        self.browser.quit()

    def test(self):

        ###############################################################################################################
        ### Cannot access protected dashboard
        ###############################################################################################################

        self.browser.get(self.URL+'/dashboard')
        self.assertNotIn('dashboard', self.browser.current_url)

        ###############################################################################################################
        ### Can signup and go to login
        ###############################################################################################################

        self.browser.get(self.URL)

        full_name_input = self.browser.find_element_by_name('fullname')
        self.assertEqual(
            full_name_input.get_attribute('placeholder'),
            'Full Name'
        )

        email_input = self.browser.find_element_by_name('email')
        password_input = self.browser.find_element_by_name('password')
        sign_up_button =self.browser.find_element_by_class_name('signup-button')

        full_name_input.send_keys('Joe Bloggs')
        email_input.send_keys(self.email)
        password_input.send_keys(self.password)

        sign_up_button.click()
        time.sleep(1)

        self.assertIn('login', self.browser.current_url)

        ###############################################################################################################
        ### Can login and go to dashboard
        ###############################################################################################################

        login_email_input = self.browser.find_element_by_name('email')
        login_password_input = self.browser.find_element_by_name('password')
        login_sign_up_button =self.browser.find_element_by_class_name('signup-button')

        login_email_input.send_keys(self.email)
        login_password_input.send_keys(self.password)

        login_sign_up_button.click()
        time.sleep(1)

        self.assertIn('dashboard', self.browser.current_url)







