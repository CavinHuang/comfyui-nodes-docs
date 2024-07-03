
# Documentation
- Class name: SDXL Prompt Styler (JPS)
- Category: JPS Nodes/Style
- Output node: False

SDXL Prompt Styler节点旨在增强和美化用于图像生成任务的文本提示。它处理并结合用户定义的正面和负面提示与预定义的模板，融入艺术家和电影参考等额外的风格元素，以创建更详细和聚焦的提示，用于生成图像。

# Input types
## Required
- text_positive_g
    - 要进行风格化和增强的主要正面提示。它作为图像生成的主要主题或主旨。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 可与主要提示结合使用的次要正面提示，用于在图像生成过程中添加额外的细节或强调。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 指定要在生成的图像中排除的不需要的元素或主题的负面提示。
    - Comfy dtype: STRING
    - Python dtype: str
- artist
    - 艺术家的名字，用于为生成的图像注入reminiscent该艺术家作品风格的元素。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- movie
    - 电影参考，用于为生成的图像赋予与该电影相关的主题元素或风格暗示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- style
    - 要应用于生成图像的总体风格方向或主题，以增强其审美吸引力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- fooocus_enhance
    - 一个可选参数，用于进一步增强对生成图像中某些元素的关注。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- fooocus_negative
    - 一个可选参数，用于指定应该在生成图像的焦点中淡化或排除的元素。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- universal_negative
    - 一个全局负面提示，用于从所有生成的图像中排除某些主题或元素，不受其他指定提示的影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- text_positive_g
    - Comfy dtype: STRING
    - 经过处理和增强后的主要正面提示。
    - Python dtype: unknown
- text_positive_l
    - Comfy dtype: STRING
    - 经过处理和增强后的次要正面提示。
    - Python dtype: unknown
- text_positive
    - Comfy dtype: STRING
    - 合并后的完整正面提示，包含主要和次要正面提示的元素。
    - Python dtype: unknown
- text_negative
    - Comfy dtype: STRING
    - 经过处理和整合后的负面提示，包含所有指定的排除元素。
    - Python dtype: unknown


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
