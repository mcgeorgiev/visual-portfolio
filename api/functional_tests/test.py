import time
import unittest
import uuid

from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.keys import Keys

MAX_WAIT = 10

class CreateAccountTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_can_create_a_new_account(self):
        URL = 'http://127.0.0.1:8080'
        self.browser.get(URL)
        self.assertIn('Portfolio', self.browser.title)


        full_name_input = self.browser.find_element_by_name('fullname')
        self.assertEqual(
            full_name_input.get_attribute('placeholder'),
            'Full Name'
        )

        email_input = self.browser.find_element_by_name('email')
        password_input = self.browser.find_element_by_name('password')
        sign_up_button =self.browser.find_element_by_class_name('signup-button')

        full_name_input.send_keys('Joe Bloggs')
        email_input.send_keys( uuid.uuid4().hex + '@bloggs.com')
        password_input.send_keys('secret-password')

        sign_up_button.click()

        self.assertIn('dashboard', self.browser.current_url)



