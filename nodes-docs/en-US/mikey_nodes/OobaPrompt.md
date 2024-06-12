---
tags:
- Prompt
- Text
- Wildcard
---

# OobaPrompt (Mikey)
## Documentation
- Class name: `OobaPrompt`
- Category: `Mikey/AI`
- Output node: `False`

The OobaPrompt node is designed to facilitate the generation of text prompts by processing and transforming input text according to specific syntax rules. It leverages an API to dynamically generate content based on the input prompt, seed, and mode, allowing for customized text generation that can incorporate external data or predefined styles.
## Input types
### Required
- **`input_prompt`**
    - The 'input_prompt' parameter is the initial text input that the node processes. It serves as the foundation for text generation, where specific syntax within the prompt can trigger dynamic content generation or style application, significantly influencing the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mode`**
    - The 'mode' parameter specifies the context or type of the input prompt, such as 'prompt', 'style', 'descriptor', 'character', or 'custom'. This allows for tailored processing and generation of content based on the mode selected.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_history`**
    - The 'custom_history' parameter allows for the inclusion of a custom history file in JSON format, which can be used to influence the generation process by providing additional context or data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - The 'seed' parameter is used to introduce a deterministic element to the random choices made during text processing. This ensures that given the same seed and input, the node will produce the same output, allowing for reproducibility in text generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The output is a transformed version of the input prompt, where wildcard syntax and custom LLM syntax have been processed and replaced with dynamically generated content.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OobaPrompt:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_prompt': ('STRING', {'multiline': True, 'default': 'Prompt Text Here', 'dynamicPrompts': False}),
                             'mode': (['prompt', 'style', 'descriptor', 'character', 'negative', 'custom'], {'default': 'prompt'}),
                             'custom_history': ('STRING', {'multiline': False, 'default': 'path to history.json', 'dynamicPrompts': True}),
                             'seed': ('INT', {'default': 0, 'min': 0, 'max': 0xffffffffffffffff}),},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text',)
    FUNCTION = 'process'

    CATEGORY = 'Mikey/AI'

    def history(self, mode, custom_history):
        if mode == 'prompt':
            return {
                "internal": [
                    [
                        "<|BEGIN-VISIBLE-CHAT|>",
                        "How can I help you today?"
                    ],
                    [
                        "I say something like 'blonde woman' and you respond with a single prompt which I can use as prompts for an AI txt2image model. Your response to blonde woman would be something like 'Blonde woman wearing a patterned orange, white, and blue sundress, smiling, on a sunny day with a blue sky, surrounded by buildings and palm trees'. It describes the image with lots of details so the AI model will understand what it needs to generate.",
                        "Sure thing! Let's begin. What is your first prompt?"
                    ],
                    [
                        "futuristic man",
                        "Man with short black hair in a highly detailed silver and black mechanical exoskeleton suit, holding a futuristic rifle, standing in a futuristic city with tall buildings and flying cars, with a futuristic cityscape in the background."
                    ],
                    [
                        "a black cat",
                        "A black cat with green eyes, sitting on a wooden table, there is a vase of flowers on the table, the cat is looking at the flowers. Sunlight is streaming in through a window, illuminating the cat and the flowers."
                    ],
                    [
                        "toaster oven",
                        "A toaster oven with a slice of bread inside, the bread is toasted and has a smiley face burned into it. The toaster oven is sitting on a kitchen counter next to a coffee maker and a microwave. The kitchen counter is made of granite and has a sink in it. There is a window above the sink with a view of a city skyline."
                    ],
                    [
                        "war",
                        "A soldier wearing a gas mask and a helmet, holding a rifle, standing in a trench. There is barbed wire in front of the trench. The sky is dark and cloudy. There is a tank in the background."
                    ],
                    [
                        "portrait of a man",
                        "A portrait of a man in his 30s with short brown hair and a beard. He is wearing a suit and tie. He is smiling. He is standing in front of a brick wall with graffiti on it."
                    ],
                    [
                        "a friendly ogre",
                        "A friendly ogre with green skin and a big smile. He is wearing a red and white striped shirt and blue overalls. He is holding a pitchfork. He is standing in a field of flowers. There is a rainbow in the sky."
                    ],
                    [
                        "puppy",
                        "A cute pug dog wearing a bowtie and reading a book. The book is titled 'How to be a good dog'. The dog is sitting on a couch in a living room. There is a fireplace in the background."
                    ],
                    [
                        "apples",
                        "Red apples stacked in a wooden crate. The crate is sitting on a wooden table in the kitchen inside a rustic farm house with old appliances. The walls are decorated with family photos. There is a window in the background with a view of the farm."
                    ],
                    [
                        "working woman",
                        "A woman is working on a laptop computer. She is wearing a white shirt and black pants. She is sitting at a desk in a modern office with trendy furniture. She has a cup of coffee on the desk next to her."
                    ]
                ],
                "visible": [
                    [
                        "",
                        "How can I help you today?"
                    ],
                ]
            }
        elif mode == 'style':
            return {
                "internal": [
                    [
                        "<|BEGIN-VISIBLE-CHAT|>",
                        "How can I help you today?"
                    ],
                    [
                        "I say something like 'painting' and you respond with a single prompt which I can use as prompts for an AI txt2image model. Your response to painting would be something like 'Impressionistic, landscape, vivid colors, loose brushstrokes, beauty of nature. Inspired by Claude Monet'. It describes the style of the image that helps convey the overall look of the image without describing the subject of the image. You might also received a description of an image, you will respond with style keywords that compliment the image description.",
                        "Sure thing! Let's begin. What is your first prompt?"
                    ],
                    [
                        "painting",
                        "Realism, oil painting, dark shadows, bright highlights, focus on capturing light and texture. Inspired by Caravaggio's chiaroscuro technique"
                    ],
                    [
                        "Impressionism",
                        "Impressionism. Soft brushstrokes, fleeting moments of light and color. Landscapes, flowers, people in motion"
                    ],
                    [
                        "painting",
                        "Impressionistic, landscape, vivid colors, loose brushstrokes, beauty of nature. Inspired by Claude Monet"
                    ],
                    [
                        "The 2015 Audi R8 Spyder sports car is parked on a driveway outside a luxurious mansion. The car is painted in a metallic grey color. The top is down revealing the sleek interior. The car is surrounded by lush greenery and palm trees.",
                        "Landscape photography, vibrant saturation, dramatic shadows, golden hour lighting, inspired by the work of Peter Lik."
                    ],
                    [
                        "abstract",
                        "Abstract expressionism, bold brushstrokes, vivid colors"
                    ],
                    [
                        "water",
                        "Water sculpture, fluid dynamics, abstract representation, in the style of Yves Klein"
                    ],
                    [
                        "A MacBook Pro open and displaying an email message. The keyboard is illuminated and the trackpad is being used. A man is sitting at a wooden desk in a cozy home office. There is a plant in the corner and sunlight coming in from a nearby window.",
                        "Still life, muted colors, soft lighting, in the style of Henri Matisse"
                    ],
                    [
                        "Surrealism",
                        "dreamlike imagery, unexpected juxtapositions, symbolic elements. features distorted or unusual forms, animals or objects transformed into otherworldly shapes"
                    ],
                    [
                        "Art Nouveau",
                        "Art Nouveau style, flowing lines, organic shapes, muted color palette, decorative elements, floral motifs."
                    ],
                    [
                        "photo",
                        "Black and white photograph, shot using a large format camera with slow shutter speeds. Grainy texture and high contrast. Influenced by the works of Edward Hopper."
                    ],
                    [
                        "photo",
                        "Color photograph, Soft focus, muted colors, romantic atmosphere, in the style of Edward Weston."
                    ],
                    [
                        "film",
                        "Long shot, film still, cinematic lighting, gritty realism, inspired by the works of Gus Van Sant"
                    ],
                    [
                        "movie",
                        "Filmic storytelling, dreamlike imagery, surreal elements, poetic narratives, reminiscent of the works of David Lynch."
                    ]
                ],
                "visible": [
                    [
                        "",
                        "How can I help you today?"
                    ]
                ]
            }
        elif mode == 'descriptor':
            return {
                "internal": [
                    [
                        "<|BEGIN-VISIBLE-CHAT|>",
                        "How can I help you today?"
                    ],
                    [
                        "I say something like 'color' and you respond with a single prompt which I can use to build a prompt for an AI txt2image model. Your response to color would be something like 'red'. It is a very short description to add dynamic variety to the prompt.",
                        "Sure thing! Let's begin. What is your first prompt?"
                    ],
                    [
                        "color",
                        "burnt sienna"
                    ],
                    [
                        "hair color",
                        "platinum blonde"
                    ],
                    [
                        "metal",
                        "rusted iron"
                    ],
                    [
                        "weather",
                        "bright and sunny"
                    ],
                    [
                        "time of day",
                        "crack of dawn"
                    ],
                    [
                        "man",
                        "tall and slender man with wide shoulders in his 30s"
                    ],
                    [
                        "ethnicity",
                        "Vietnamese"
                    ],
                    [
                        "occupation",
                        "Heavy diesel mechanic"
                    ],
                    [
                        "art style",
                        "crystal cubism"
                    ],
                    [
                        "artist",
                        "Camille Pissarro"
                    ],
                    [
                        "movie director",
                        "David Lynch"
                    ]
                ],
                "visible": [
                    [
                        "",
                        "How can I help you today?"
                    ]
                ]
            }
        elif mode == 'character':
            return {
                "internal": [
                    [
                        "<|BEGIN-VISIBLE-CHAT|>",
                        "How can I help you today?"
                    ],
                    [
                        "When a user requests a character description, generate a detailed description of the character as you would expect from the writer George R. R. Martin. The description should be a suitable prompt based on the description that encapsulates the character's key visual elements for image creation using a txt2img model.",
                        "Sure thing! Let's begin. What is your first prompt?"
                    ],
                    [
                        "jolly cartoon octopus",
                        "A cartoon octopus with a jolly demeanor in a sunshiny yellow and orange color scheme, wearing a small top hat and a polka-dotted bow tie, surrounded by intricate sculptures made of its own ink, in the midst of an undersea setting that hints at festivity and mirth.",
                    ],
                    [
                        "a dapper young lady spy who wears suits",
                        "A young 1920s lady spy with chestnut hair in a bob cut, piercing emerald eyes, wearing a tailored charcoal pinstripe suit with a white shirt and a silk tie, holding a silver cigarette case, exuding an aura of mystery and sophistication against a backdrop of Parisian nightlife.",
                    ],
                    [
                        "a charming robot",
                        "A charming robot with a sleek chrome body, art deco design elements, azure glowing eyes, and a gentle smile. Wearing a holographic bow tie and a vest painted to look like a dapper suit, engaged in performing a magic trick with a playful, inquisitive expression in an urban park setting.",
                    ],
                    [
                        "cartoon ant",
                        "A cartoon ant with a vibrant blue exoskeleton, oversized round eyes full of curiosity, wearing a leaf-green vest and a tiny fabric cap. Exhibiting an expression of wonder and excitement, amidst a backdrop of an underground ant colony bustling with activity.",
                    ],
                    [
                        "a cyberpunk gnome",
                        "A cyberpunk gnome with pale skin and cybernetic jade eyes, wearing a long tattered coat with circuitry patches and a sleek metallic pointed helmet. Surrounded by holographic screens and neon lights in a dim, cluttered workshop filled with futuristic gadgets and data screens.",
                    ]
                ],
                "visible": [
                    [
                        "",
                        "How can I help you today?"
                    ]
                ]
            }
        elif mode == 'negative':
            return {
                "internal": [
                    [
                        "<|BEGIN-VISIBLE-CHAT|>",
                        "How can I help you today?"
                    ],
                    [
                        "I provide a prompt for a text to image AI model, and you will respond with a prompt that helps to improve the quality of the image." \
                            "The prompt contains styles you don't want to see in the image. For example if the user asks for a photo, the your response would contain terms such as 'cartoon, illustration, 3d render'."\
                                "The word 'no' is forbidden!. Do not repeat yourself, do not provide similar but different words. Do not provide sentences, just words separated by commas. Keep it short.",
                        "Sure thing! Let's begin. What is your first prompt?"
                    ],
                    [
                        "breathtaking image of a woman in a red dress. award-winning, professional, highly detailed",
                        "ugly, deformed, noisy, blurry, distorted, grainy, plain background, monochrome, signature, watermark."
                    ],
                    [
                        "concept art. digital artwork, illustrative, painterly, matte painting, highly detailed",
                        "photo, photorealistic, realism, ugly, signature."
                    ],
                    [
                        "3d model, unreal engine, textures, volumetric lighting, raytraced rendering, subject centered",
                        "watermark, 2D, low poly, polygon mesh, cartoon, trypophobia, miniature, traditional art, logo."
                    ],
                    [
                        "comic book art, onomatopoeic graphics, halftone dots, color separation, bold lines, reminiscent of art from Marvel, DC, Dark Horse, Image, and other comic book publishers",
                        "photo, photorealistic, realism, ugly, signature."
                    ],
                    [
                        "dark fantasy art, gothic themes, macabre, horror, dark, gloomy, sinister, ominous, eerie",
                        "watermark, bright colors, cheerful, happy, cute, cartoon, anime, digital art, 3d render, photograph, 2d art."
                    ],
                    [
                        "charcoal drawing, rich blacks, contrasting whites, smudging, erasure, hatching, cross-hatching, tonal values, rough texture",
                        "photograph, painting, watercolor, colorful, 3d render, cartoon, anime, digital art."
                    ],
                    [
                        "stunning photograph of a tiger in a tropical rainforest",
                        "black and white, cartoon, illustration, low resolution, noisy, blurry, desaturated, ugly, deformed."
                    ]
                ],
                "visible": [
                    [
                        "",
                        "How can I help you today?"
                    ]
                ]
            }
        elif mode == 'custom':
            # open json file that is in the custom_history path
            try:
                history = json.load(open(custom_history))
                return history
            except:
                raise Exception('Error loading custom history file')

    def api_request(self, prompt, seed, mode, custom_history):
        # check if json file in root comfy directory called oooba.json
        history = self.history(mode, custom_history)
        if mode == 'prompt':
            prompt = f'{prompt}, describe in detail.'
        if mode == 'descriptor':
            # use seed to add a bit more randomness to the prompt
            spice = ['a', 'the', 'this', 'that',
                     'an exotic', 'an interesting', 'a colorful', 'a vibrant', 'get creative!', 'think outside the box!', 'a rare',
                     'a standard', 'a typical', 'a common', 'a normal', 'a regular', 'a usual', 'an ordinary',
                     'a unique', 'a one of a kind', 'a special', 'a distinctive', 'a peculiar', 'a remarkable', 'a noteworthy',
                     'popular in the victorian era', 'popular in the 1920s', 'popular in the 1950s', 'popular in the 1980s',
                     'popular in the 1990s', 'popular in the 2000s', 'popular in the 2010s', 'popular in the 2020s',
                     'popular in asia', 'popular in europe', 'popular in north america', 'popular in south america',
                     'popular in africa', 'popular in australia', 'popular in the middle east', 'popular in the pacific islands',
                     'popular with young people', 'popular with the elderly', 'trending on social media', 'popular on tiktok',
                     'trending on pinterest', 'popular on instagram', 'popular on facebook', 'popular on twitter',
                     'popular on reddit', 'popular on youtube', 'popular on tumblr', 'popular on snapchat',
                     'popular on linkedin', 'popular on twitch', 'popular on discord',
                     'unusual example of', 'a classic', 'an underrated', 'an innovative','a historical', 'a modern', 'a contemporary',
                     'a futuristic', 'a traditional', 'an eco-friendly', 'a controversial', 'a political', 'a religious',
                     'a spiritual', 'a philosophical', 'a scientific']
            random.seed(seed)
            prompt = f'{random.choice(spice)} {prompt}'
        request = {
            'user_input': prompt,
            'max_new_tokens': 250,
            'auto_max_new_tokens': False,
            'max_tokens_second': 0,
            'history': history,
            'mode': 'instruct',
             'regenerate': False,
            '_continue': False,
            'preset': 'StarChat',
            'seed': seed,
        }
        HOST = 'localhost:5000'
        URI = f'http://{HOST}/api/v1/chat'
        try:
            response = requests.post(URI, json=request, timeout=20)
        except requests.exceptions.ConnectionError:
            raise Exception('Are you running oobabooga with API enabled?')

        if response.status_code == 200:
            result = response.json()['results'][0]['history']['visible'][-1][1]
            result = html.unescape(result)  # decode URL encoded special characters
            return result
        else:
            return 'Error'

    def process(self, input_prompt, mode, custom_history, seed, prompt=None, unique_id=None, extra_pnginfo=None):
        # search and replace
        input_prompt = search_and_replace(input_prompt, extra_pnginfo, prompt)
        # wildcard sytax is {like|this}
        # select a random word from the | separated list
        wc_re = re.compile(r'{([^}]+)}')
        def repl(m):
            return random.choice(m.group(1).split('|'))
        for m in wc_re.finditer(input_prompt):
            input_prompt = input_prompt.replace(m.group(0), repl(m))
        result = self.api_request(input_prompt, seed, mode, custom_history)
        prompt.get(str(unique_id))['inputs']['output_text'] = result
        return (result,)

```
