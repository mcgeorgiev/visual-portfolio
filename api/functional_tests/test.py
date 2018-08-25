import os
import time
import unittest

from selenium import webdriver

class CreateAccountTest(unittest.TestCase):

    def setUp(self):
        executable_path = "/usr/local/bin/chromedriver"
        os.environ["webdriver.chrome.driver"] = executable_path

        self.browser = webdriver.Chrome(executable_path=executable_path)
        self.live_server_url = 'http://127.0.0.1:8000'
        self.URL = 'http://127.0.0.1:8080'


    def tearDown(self):
        self.browser.quit()

    def test_can_create_a_new_account(self):
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
        email_input.send_keys('joe@bloggs.com')
        password_input.send_keys('secret-password')

        sign_up_button.click()
        time.sleep(1)

        self.assertIn('dashboard', self.browser.current_url)

    def test_cannot_access_protected_dashboard(self):
        self.browser.get(self.URL)
        self.assertNotIn('dashboard', self.browser.current_url)


    def test_can_login_with_existing_account(self):
        





