require 'yaml'
require "selenium-webdriver"

task :screenshot_guides do
  ENV['webdriver.chrome.driver'] = 'bin/chromedriver'
  driver = Selenium::WebDriver.for :chrome
  driver.manage.window.resize_to(1440, 900)

  YAML.load_file('data/styleguides.yml').each do |styleguide|

    print "Screenshotting #{styleguide['name']} (#{styleguide['url']})"
    $stdout.flush

    driver.navigate.to styleguide['url']
    driver.save_screenshot("source/images/#{styleguide['filename']}.png")

    puts " -- Success"
  end

  driver.quit
end

task :fill_data do
  styleguides = YAML.load_file('data/styleguides.yml')

  styleguides.each do |styleguide|
    styleguide['filename'] = styleguide['name'].downcase.gsub(/\W/, '_')
    styleguide['classname'] = styleguide['name'].downcase.gsub(/\W/, '-')
    styleguide['img_path'] = "/ui-styleguides/images/#{styleguide['filename']}.png"
  end

  File.open('data/styleguides.yml', 'w') { |f| f.write styleguides.to_yaml }
end
