import re
input_text = '''
{
    "MapName": "de_mirage"
    "ScreenText": 
    {
    }
    "MapAnnotationNode0": 
    {
        "Enabled": true
        "Type": "grenade"
        "Id": "ce735cf5-9a78-4ea4-8fb4-d5ff7b3a26c5"
        "SubType": "main"
        "Position": [ 353.321533, -381.762878, -165.74646 ]
        "Angles": [ 0.0, -140.324936, 0.0 ]
        "VisiblePfx": true
        "Color": [ 255, 255, 255 ]
        "TextPositionOffset": [ 0.0, 0.0, 60.0 ]
        "TextFacePlayer": true
        "TextHorizontalAlign": "center"
        "RevealOnSuccess": false
        "Title": 
        {
            "Text": "Connector Smoke"
            "FontSize": 125
            "FadeInDist": 600.0
            "FadeOutDist": 40.0
        }
        "Desc": 
        {
            "Text": "standing instructions"
            "FontSize": 75
            "FadeInDist": 300.0
            "FadeOutDist": 40.0
        }
    }
}'''


def fix_json_syntax_v2(input_text):
    # Add commas between key-value pairs where missing
    corrected_text = re.sub(r'(?<=["\}\]])\s*(?=["\{])', ',', input_text)
    return corrected_text

# Re-attempt to fix the input text
fixed_text_v2 = fix_json_syntax_v2(input_text)
print(fixed_text_v2)

