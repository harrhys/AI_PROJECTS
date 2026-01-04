import time

import pandas as pd

from selenium import webdriver

from selenium.webdriver.common.by import By

from selenium.webdriver.common.keys import Keys
 
# Load Excel file

excel_file = "ids.xlsx"  # Update with your file path

df = pd.read_excel(excel_file)
 
# Convert column values to a list (assuming IDs are in the first column)

id_list = df.iloc[:, 0].tolist()
 
# Setup Selenium WebDriver

driver = webdriver.Chrome()  # Ensure you have ChromeDriver installed

driver.get("https://your-webpage-url.com")  # Replace with your actual webpage URL
 
# Loop through IDs and submit them one by one

for id_value in id_list:

    try:

        # Locate the text field and enter ID

        text_field = driver.find_element(By.ID, "text_field_id")  # Replace with actual ID or selector

        text_field.clear()

        text_field.send_keys(str(id_value))

        # Click submit button

        submit_button = driver.find_element(By.ID, "submit_button_id")  # Replace with actual button ID or selector

        submit_button.click()

        time.sleep(2)  # Wait to avoid rapid submissions

    except Exception as e:

        print(f"Error processing ID {id_value}: {e}")
 
# Close the browser after completion

driver.quit()

 