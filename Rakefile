require 'liquid'
require 'json'

task :scrape do
  ruby 'scrape.rb'
end

task :build, [:base_dir] do |_task, args|
  chapters = JSON.parse(File.read('chapters.json'))

  if args[:base_dir]
    base_dir = args[:base_dir]
    base_dir += '/' unless base_dir.end_with?('/')
  else
    base_dir = ''
  end

  template = Liquid::Template.parse(File.read('index.html.liquid'))
  File.open('public/index.html', 'w') do |file|
    file.write(template.render('chapters' => chapters, 'base_dir' => base_dir))
  end
end

task :preview do
  ruby '-run', '-ehttpd', 'public', '-p8000'
end
