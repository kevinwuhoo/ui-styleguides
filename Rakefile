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
    driver.save_screenshot("source/images/#{styleguide['filename']}")

    puts " -- Success"
  end

  driver.quit

  print "Resizing images wuth ImageMagick"
  `mogrify -resize 1200x source/images/*png`
  puts " -- Success"
end

task :fill_data do
  styleguides = YAML.load_file('data/styleguides.yml')

  styleguides.each do |styleguide|
    styleguide['filename'] = styleguide['name'].downcase.gsub(/\W/, '_') + '.png'
    styleguide['classname'] = styleguide['name'].downcase.gsub(/\W/, '-')
  end

  File.open('data/styleguides.yml', 'w') { |f| f.write styleguides.to_yaml }
end

task :generate_readme do
  readme = File.open('README.md', 'w')
  readme.puts '# UI Styleguides'
  readme.write 'A curated list of UI styleguides deployed to '\
               '[http://kevinwuhoo.github.io/ui-styleguides/]'\
               '(http://kevinwuhoo.github.io/ui-styleguides/).'\
               ' Selected styleguides contain some combination of '

  descriptions = YAML.load_file('data/styleguides.yml').map do |guide|
    guide['description'].split(',').map(&:strip) if guide['description']
  end
  descriptions = descriptions.flatten.compact.uniq.sort.join(', ')

  readme.puts "#{descriptions}.\n\n"

  YAML.load_file('data/styleguides.yml').each do |guide|
    readme.puts "* [#{guide['name']}](#{guide['url']}) - #{guide['description']}"
  end

end
