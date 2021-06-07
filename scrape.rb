# frozen_string_literal: true

require 'nokogiri'
require 'httparty'
require 'uri'
require 'json'

BASE = 'http://buyingtime.the-comic.org'
DEST = 'public/chapters'

chapters = {}

# :reek:IrresponsibleModule
module Helpers
  def self.media_url(doc)
    if (node = doc.css('#comicimagewrap object param').first)
      node.attr('value')
    elsif (node = doc.css('#comicimagewrap img').first)
      node.attr('src')
    end
  end
end

puts 'Starting scrape'
start = Nokogiri::HTML(HTTParty.get("#{BASE}/").body)

start.css('select.comicnavlink option').each do |opt|
  page_uri = opt.attr('value')
  chapter = page_uri.match(%r{/comics/(\d+)})[1]
  title = opt.text

  puts "Chapter #{chapter}: \"#{title}\""
  doc = Nokogiri::HTML(HTTParty.get("#{BASE}#{page_uri}").body)
  media_url = Helpers.media_url(doc)
  raise 'Unknown media type' unless media_url

  ext = File.extname(URI.parse(media_url).path)
  filename = "chapter_#{chapter}#{ext}"
  chapters[filename] = title

  # Skip the file if we have it already
  next if File.exist?("#{DEST}/#{filename}")

  puts "Downloading #{media_url} -> #{filename}"
  File.open("#{DEST}/#{filename}", 'wb') do |file|
    HTTParty.get(media_url, stream_body: true) do |fragment|
      file.write(fragment)
    end
  end
end

File.open('chapters.json', 'w') do |file|
  file.write(JSON.pretty_generate(chapters))
end
