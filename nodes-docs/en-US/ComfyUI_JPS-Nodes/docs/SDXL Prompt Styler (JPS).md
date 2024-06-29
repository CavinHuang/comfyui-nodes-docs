---
tags:
- Prompt
- PromptStyling
---

# SDXL Prompt Styler (JPS)
## Documentation
- Class name: `SDXL Prompt Styler (JPS)`
- Category: `JPS Nodes/Style`
- Output node: `False`

The SDXL Prompt Styler node is designed to enhance and stylize text prompts for image generation tasks. It processes and combines user-defined positive and negative prompts with predefined templates, incorporating additional stylistic elements such as artist and movie references, to create more detailed and focused prompts for generating images.
## Input types
### Required
- **`text_positive_g`**
    - The primary positive prompt to be stylized and enhanced. It serves as the main subject or theme for the image generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - A secondary positive prompt that can be combined with the primary prompt for additional detail or emphasis in the image generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - A negative prompt that specifies undesired elements or themes to be excluded from the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`artist`**
    - An artist's name to infuse the generated image with a style reminiscent of that artist's work.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`movie`**
    - A movie reference to imbue the generated image with thematic elements or stylistic cues associated with that movie.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`style`**
    - A general stylistic direction or theme to apply to the generated image, enhancing its aesthetic appeal.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`fooocus_enhance`**
    - An optional parameter to further enhance the focus on certain elements within the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`fooocus_negative`**
    - An optional parameter to specify elements that should be de-emphasized or excluded from the focus of the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`universal_negative`**
    - A global negative prompt to exclude certain themes or elements from all generated images, regardless of other specified prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Prompt_Styler:

    def __init__(self):
        pass

    uni_neg = ["OFF","ON"]

    @classmethod
    def INPUT_TYPES(self):
        current_directory = os.path.dirname(os.path.realpath(__file__))
        self.json_data_artists, artists = load_styles_from_directory(os.path.join(current_directory, 'styles', 'artists'))
        self.json_data_movies, movies = load_styles_from_directory(os.path.join(current_directory, 'styles', 'movies'))
        self.json_data_styles, styles = load_styles_from_directory(os.path.join(current_directory, 'styles', 'main'))
        
        return {
            "required": {
                "text_positive_g": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": True}),
                "text_positive_l": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": True}),
                "text_negative": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": True}),
                "artist": ((artists), ),
                "movie": ((movies), ),
                "style": ((styles), ),
                "fooocus_enhance": (self.uni_neg,),                
                "fooocus_negative": (self.uni_neg,),
                "universal_negative": (self.uni_neg,),
            },
        }

    RETURN_TYPES = ('STRING','STRING','STRING','STRING',)
    RETURN_NAMES = ('text_positive_g','text_positive_l','text_positive','text_negative',)
    FUNCTION = 'sdxlpromptstyler'
    CATEGORY = 'JPS Nodes/Style'

    def sdxlpromptstyler(self, text_positive_g, text_positive_l, text_negative, artist, movie, style, fooocus_enhance, fooocus_negative, universal_negative):
        # Process and combine prompts in templates
        # The function replaces the positive prompt placeholder in the template,
        # and combines the negative prompt with the template's negative prompt, if they exist.

        text_pos_g_style = ""
        text_pos_l_style = ""
        text_pos_style = ""
        text_neg_style = ""

        text_pos_g_artist, text_pos_l_artist, text_neg_artist = read_sdxl_templates_replace_and_combine(self.json_data_artists, artist, text_positive_g, text_positive_l, text_negative)

        if(text_positive_g == text_positive_l):
            if(text_pos_l_artist != text_positive_l and text_pos_g_artist != text_positive_g):
                text_positive_l = ""
                text_pos_g_artist, text_pos_l_artist, text_neg_artist = read_sdxl_templates_replace_and_combine(self.json_data_artist, artist, text_positive_g, text_positive_l, text_negative) 
            elif(text_pos_g_artist != text_positive_g):
                text_pos_l_artist = text_pos_g_artist
            elif(text_pos_l_artist != text_positive_l):
                text_pos_g_artist = text_pos_l_artist

        text_pos_g_movie, text_pos_l_movie, text_neg_movie = read_sdxl_templates_replace_and_combine(self.json_data_movies, movie, text_pos_g_artist, text_pos_l_artist, text_negative)

        if(text_pos_g_artist == text_pos_l_artist):
            if(text_pos_l_movie != text_pos_l_artist and text_pos_g_movie != text_pos_g_artist):
                text_pos_l_artist = ""
                text_pos_g_movie, text_pos_l_movie, text_neg_movie = read_sdxl_templates_replace_and_combine(self.json_data_movie, movie, text_positive_g, text_positive_l, text_negative) 
            elif(text_pos_g_movie != text_pos_g_artist):
                text_pos_l_movie = text_pos_g_movie
            elif(text_pos_l_movie != text_pos_l_artist):
                text_pos_g_movie = text_pos_l_movie

        text_pos_g_style, text_pos_l_style, text_neg_style = read_sdxl_templates_replace_and_combine(self.json_data_styles, style, text_pos_g_movie, text_pos_l_movie, text_neg_movie)

        if(text_pos_g_movie == text_pos_l_movie):
            if(text_pos_l_movie != text_pos_l_style and text_pos_g_movie != text_pos_g_style):
                text_pos_l_movie = ""
                text_pos_g_style, text_pos_l_style, text_neg_style = read_sdxl_templates_replace_and_combine(self.json_data_styles, style, text_pos_g_movie, text_pos_l_movie, text_neg_movie) 
            elif(text_pos_g_movie != text_pos_g_style):
                text_pos_l_style = text_pos_g_style
            elif(text_pos_l_movie != text_pos_l_style):
                text_pos_g_style = text_pos_l_style

        if(text_pos_g_style != text_pos_l_style):
            if(text_pos_l_style != ""):
                text_pos_style = text_pos_g_style + ' . ' + text_pos_l_style
            else:
                text_pos_style = text_pos_g_style 
        else:
            text_pos_style = text_pos_g_style 

        if(fooocus_enhance == "ON"):
            if (text_neg_style != ''):
                text_neg_style = text_neg_style + ', (worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (blur, blurry, grainy), morbid, ugly, asymmetrical, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, (airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga, amateur:1.3), (3D ,3D Game, 3D Game Scene, 3D Character:1.1), (bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3)'
            else:
                text_neg_style = '(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (blur, blurry, grainy), morbid, ugly, asymmetrical, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, (airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga, amateur:1.3), (3D ,3D Game, 3D Game Scene, 3D Character:1.1), (bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3)'

        if(fooocus_negative == "ON"):
            if (text_neg_style != ''):
                text_neg_style = text_neg_style + ', deformed, bad anatomy, disfigured, poorly drawn face, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, disconnected head, malformed hands, long neck, mutated hands and fingers, bad hands, missing fingers, cropped, worst quality, low quality, mutation, poorly drawn, huge calf, bad hands, fused hand, missing hand, disappearing arms, disappearing thigh, disappearing calf, disappearing legs, missing fingers, fused fingers, abnormal eye proportion, Abnormal hands, abnormal legs, abnormal feet, abnormal fingers, drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly, anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch'
            else:
                text_neg_style = 'deformed, bad anatomy, disfigured, poorly drawn face, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, disconnected head, malformed hands, long neck, mutated hands and fingers, bad hands, missing fingers, cropped, worst quality, low quality, mutation, poorly drawn, huge calf, bad hands, fused hand, missing hand, disappearing arms, disappearing thigh, disappearing calf, disappearing legs, missing fingers, fused fingers, abnormal eye proportion, Abnormal hands, abnormal legs, abnormal feet, abnormal fingers, drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly, anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch'

        if(universal_negative == "ON"):
            if (text_neg_style != ''):
                text_neg_style = text_neg_style + ', text, watermark, low-quality, signature, moire pattern, downsampling, aliasing, distorted, blurry, glossy, blur, jpeg artifacts, compression artifacts, poorly drawn, low-resolution, bad, distortion, twisted, excessive, exaggerated pose, exaggerated limbs, grainy, symmetrical, duplicate, error, pattern, beginner, pixelated, fake, hyper, glitch, overexposed, high-contrast, bad-contrast'
            else:
                text_neg_style = 'text, watermark, low-quality, signature, moire pattern, downsampling, aliasing, distorted, blurry, glossy, blur, jpeg artifacts, compression artifacts, poorly drawn, low-resolution, bad, distortion, twisted, excessive, exaggerated pose, exaggerated limbs, grainy, symmetrical, duplicate, error, pattern, beginner, pixelated, fake, hyper, glitch, overexposed, high-contrast, bad-contrast'

        return text_pos_g_style, text_pos_l_style, text_pos_style, text_neg_style

```
