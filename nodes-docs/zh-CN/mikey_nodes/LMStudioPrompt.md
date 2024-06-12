# Documentation
- Class name: LMStudioPrompt
- Category: Mikey/AI
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

LMStudioPrompt节点旨在为AI文本到图像模型生成提示提供便利。它通过各种模式如'prompt'、'style'、'descriptor'和'character'处理输入提示，通过详细的描述来丰富提示，指导AI模型的图像生成。该节点还支持自定义历史记录以提供个性化响应，并与外部服务器集成以检索和处理提示结果。

# Input types
## Required
- input_prompt
    - 输入提示是LMStudioPrompt节点的关键参数，因为它直接影响AI生成图像的内容和方向。它作为节点将产生详细描述的基础，旨在为AI模型提供清晰和富有想象力的视觉。
    - Comfy dtype: STRING
    - Python dtype: str
- mode
    - 模式参数决定了LMStudioPrompt节点处理输入提示的方法。每种模式对应生成详细描述的不同方式，例如在'style'模式中专注于图像的风格，或在'character'模式中制作详细的角色描述。模式的选择显著影响生成提示的输出和应用。
    - Comfy dtype: COMBO['prompt', 'style', 'descriptor', 'character', 'custom']
    - Python dtype: str
## Optional
- custom_history
    - 当模式设置为'custom'时，custom_history参数变得重要。它允许用户提供一个指向历史记录文件的路径，节点将使用该路径生成响应。此功能使节点能够访问外部数据源，以实现更个性化或情境感知的提示生成过程。
    - Comfy dtype: STRING
    - Python dtype: str
- server_address
    - server_address参数指定LMStudioPrompt节点将与之通信以发送和接收数据的服务器地址。当节点需要与外部服务或应用程序交互以处理提示时，这特别有用。
    - Comfy dtype: STRING
    - Python dtype: str
- server_port
    - server_port参数定义了LMStudioPrompt节点将用于通信的服务器上的端口号。它是建立与服务器连接的重要组成部分，确保节点可以正确发送和接收数据。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - seed参数用于初始化随机数生成器，确保LMStudioPrompt节点产生的结果是可复现的。这对于调试或在多次运行中期望一致的结果时特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- text
    - LMStudioPrompt节点的文本输出包含处理后的提示结果。它是基于输入提示和选定模式生成的详细描述，可以直接用作AI文本到图像模型的输入，以创建图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LMStudioPrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_prompt': ('STRING', {'multiline': True, 'default': 'Prompt Text Here', 'dynamicPrompts': False}), 'mode': (['prompt', 'style', 'descriptor', 'character', 'custom'], {'default': 'prompt'}), 'custom_history': ('STRING', {'multiline': False, 'default': 'path to history.json', 'dynamicPrompts': True}), 'server_address': ('STRING', {'default': 'localhost'}), 'server_port': ('INT', {'default': 1234, 'min': 0, 'max': 65535}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text',)
    FUNCTION = 'process'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/AI'

    def history(self, mode, custom_history):
        if mode == 'prompt':
            return {'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'}, {'role': 'user', 'content': "I say something like 'blonde woman' and you respond with a single prompt which I can use as prompts for an AI txt2image model. Your response to blonde woman would be something like 'Blonde woman wearing a patterned orange, white, and blue sundress, smiling, on a sunny day with a blue sky, surrounded by buildings and palm trees'. It describes the image with lots of details so the AI model will understand what it needs to generate."}, {'role': 'assistant', 'content': "Sure thing! Let's begin. What is your first prompt?"}, {'role': 'user', 'content': 'futuristic man'}, {'role': 'assistant', 'content': 'Man with short black hair in a highly detailed silver and black mechanical exoskeleton suit, holding a futuristic rifle, standing in a futuristic city with tall buildings and flying cars, with a futuristic cityscape in the background.'}, {'role': 'user', 'content': 'a black cat'}, {'role': 'assistant', 'content': 'A black cat with green eyes, sitting on a wooden table, there is a vase of flowers on the table, the cat is looking at the flowers. Sunlight is streaming in through a window, illuminating the cat and the flowers.'}, {'role': 'user', 'content': 'toaster oven'}, {'role': 'assistant', 'content': 'A toaster oven with a slice of bread inside, the bread is toasted and has a smiley face burned into it. The toaster oven is sitting on a kitchen counter next to a coffee maker and a microwave. The kitchen counter is made of granite and has a sink in it. There is a window above the sink with a view of a city skyline.'}, {'role': 'user', 'content': 'war'}, {'role': 'assistant', 'content': 'A soldier wearing a gas mask and a helmet, holding a rifle, standing in a trench. There is barbed wire in front of the trench. The sky is dark and cloudy. There is a tank in the background.'}, {'role': 'user', 'content': 'portrait of a man'}, {'role': 'assistant', 'content': 'A portrait of a man in his 30s with short brown hair and a beard. He is wearing a suit and tie. He is smiling. He is standing in front of a brick wall with graffiti on it.'}, {'role': 'user', 'content': 'a friendly ogre'}, {'role': 'assistant', 'content': 'A friendly ogre with green skin and a big smile. He is wearing a red and white striped shirt and blue overalls. He is holding a pitchfork. He is standing in a field of flowers. There is a rainbow in the sky.'}, {'role': 'user', 'content': 'puppy'}, {'role': 'assistant', 'content': "A cute pug dog wearing a bowtie and reading a book. The book is titled 'How to be a good dog'. The dog is sitting on a couch in a living room. There is a fireplace in the background."}, {'role': 'user', 'content': 'apples'}, {'role': 'assistant', 'content': 'Red apples stacked in a wooden crate. The crate is sitting on a wooden table in the kitchen inside a rustic farm house with old appliances. The walls are decorated with family photos. There is a window in the background with a view of the farm.'}, {'role': 'user', 'content': 'working woman'}, {'role': 'assistant', 'content': 'A woman is working on a laptop computer. She is wearing a white shirt and black pants. She is sitting at a desk in a modern office with trendy furniture. She has a cup of coffee on the desk next to her.'}]}
        elif mode == 'style':
            return {'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'}, {'role': 'user', 'content': "I say something like 'painting' and you respond with a single prompt which I can use as prompts for an AI txt2image model. Your response to painting would be something like 'Impressionistic, landscape, vivid colors, loose brushstrokes, beauty of nature. Inspired by Claude Monet'. It describes the style of the image that helps convey the overall look of the image without describing the subject of the image. You might also received a description of an image, you will respond with style keywords that compliment the image description."}, {'role': 'assistant', 'content': "Sure thing! Let's begin. What is your first prompt?"}, {'role': 'user', 'content': 'painting'}, {'role': 'assistant', 'content': "Realism, oil painting, dark shadows, bright highlights, focus on capturing light and texture. Inspired by Caravaggio's chiaroscuro technique"}, {'role': 'user', 'content': 'Impressionism'}, {'role': 'assistant', 'content': 'Impressionism. Soft brushstrokes, fleeting moments of light and color. Landscapes, flowers, people in motion'}, {'role': 'user', 'content': 'painting'}, {'role': 'assistant', 'content': 'Impressionistic, landscape, vivid colors, loose brushstrokes, beauty of nature. Inspired by Claude Monet'}, {'role': 'user', 'content': 'The 2015 Audi R8 Spyder sports car is parked on a driveway outside a luxurious mansion. The car is painted in a metallic grey color. The top is down revealing the sleek interior. The car is surrounded by lush greenery and palm trees.'}, {'role': 'assistant', 'content': 'Landscape photography, vibrant saturation, dramatic shadows, golden hour lighting, inspired by the work of Peter Lik.'}, {'role': 'user', 'content': 'abstract'}, {'role': 'assistant', 'content': 'Abstract expressionism, bold brushstrokes, vivid colors'}, {'role': 'user', 'content': 'water'}, {'role': 'assistant', 'content': 'Water sculpture, fluid dynamics, abstract representation, in the style of Yves Klein'}, {'role': 'user', 'content': 'A MacBook Pro open and displaying an email message. The keyboard is illuminated and the trackpad is being used. A man is sitting at a wooden desk in a cozy home office. There is a plant in the corner and sunlight coming in from a nearby window.'}, {'role': 'assistant', 'content': 'Still life, muted colors, soft lighting, in the style of Henri Matisse'}, {'role': 'user', 'content': 'Surrealism'}, {'role': 'assistant', 'content': 'dreamlike imagery, unexpected juxtapositions, symbolic elements. features distorted or unusual forms, animals or objects transformed into otherworldly shapes'}, {'role': 'user', 'content': 'Art Nouveau'}, {'role': 'assistant', 'content': 'Art Nouveau style, flowing lines, organic shapes, muted color palette, decorative elements, floral motifs.'}, {'role': 'user', 'content': 'photo'}, {'role': 'assistant', 'content': 'Black and white photograph, shot using a large format camera with slow shutter speeds. Grainy texture and high contrast. Influenced by the works of Edward Hopper.'}, {'role': 'user', 'content': 'photo'}, {'role': 'assistant', 'content': 'Color photograph, Soft focus, muted colors, romantic atmosphere, in the style of Edward Weston.'}, {'role': 'user', 'content': 'film'}, {'role': 'assistant', 'content': 'Long shot, film still, cinematic lighting, gritty realism, inspired by the works of Gus Van Sant'}, {'role': 'user', 'content': 'movie'}, {'role': 'assistant', 'content': 'Filmic storytelling, dreamlike imagery, surreal elements, poetic narratives, reminiscent of the works of David Lynch.'}]}
        elif mode == 'descriptor':
            return {'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'}, {'role': 'user', 'content': "I say something like 'color' and you respond with a single prompt which I can use to build a prompt for an AI txt2image model. Your response to color would be something like 'red'. It is a very short description to add dynamic variety to the prompt."}, {'role': 'assistant', 'content': "Sure thing! Let's begin. What is your first prompt?"}, {'role': 'user', 'content': 'color'}, {'role': 'assistant', 'content': 'burnt sienna'}, {'role': 'user', 'content': 'hair color'}, {'role': 'assistant', 'content': 'platinum blonde'}, {'role': 'user', 'content': 'metal'}, {'role': 'assistant', 'content': 'rusted iron'}, {'role': 'user', 'content': 'weather'}, {'role': 'assistant', 'content': 'bright and sunny'}, {'role': 'user', 'content': 'time of day'}, {'role': 'assistant', 'content': 'crack of dawn'}, {'role': 'user', 'content': 'man'}, {'role': 'assistant', 'content': 'tall and slender man with wide shoulders in his 30s'}, {'role': 'user', 'content': 'ethnicity'}, {'role': 'assistant', 'content': 'Vietnamese'}, {'role': 'user', 'content': 'occupation'}, {'role': 'assistant', 'content': 'Heavy diesel mechanic'}, {'role': 'user', 'content': 'art style'}, {'role': 'assistant', 'content': 'crystal cubism'}, {'role': 'user', 'content': 'artist'}, {'role': 'assistant', 'content': 'Camille Pissarro'}, {'role': 'user', 'content': 'movie director'}, {'role': 'assistant', 'content': 'David Lynch'}]}
        elif mode == 'character':
            return {'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'}, {'role': 'user', 'content': "When a user requests a character description, generate a detailed description of the character as you would expect from the writer George R. R. Martin. The description should be a suitable prompt based on the description that encapsulates the character's key visual elements for image creation using a txt2img model."}, {'role': 'assistant', 'content': "Sure thing! Let's begin. What is your first prompt?"}, {'role': 'user', 'content': 'jolly cartoon octopus'}, {'role': 'assistant', 'content': 'A cartoon octopus with a jolly demeanor in a sunshiny yellow and orange color scheme, wearing a small top hat and a polka-dotted bow tie, surrounded by intricate sculptures made of its own ink, in the midst of an undersea setting that hints at festivity and mirth.'}, {'role': 'user', 'content': 'a dapper young lady spy who wears suits'}, {'role': 'assistant', 'content': 'A young 1920s lady spy with chestnut hair in a bob cut, piercing emerald eyes, wearing a tailored charcoal pinstripe suit with a white shirt and a silk tie, holding a silver cigarette case, exuding an aura of mystery and sophistication against a backdrop of Parisian nightlife.'}, {'role': 'user', 'content': 'a charming robot'}, {'role': 'assistant', 'content': 'A charming robot with a sleek chrome body, art deco design elements, azure glowing eyes, and a gentle smile. Wearing a holographic bow tie and a vest painted to look like a dapper suit, engaged in performing a magic trick with a playful, inquisitive expression in an urban park setting.'}, {'role': 'user', 'content': 'cartoon ant'}, {'role': 'assistant', 'content': 'A cartoon ant with a vibrant blue exoskeleton, oversized round eyes full of curiosity, wearing a leaf-green vest and a tiny fabric cap. Exhibiting an expression of wonder and excitement, amidst a backdrop of an underground ant colony bustling with activity.'}, {'role': 'user', 'content': 'a cyberpunk gnome'}, {'role': 'assistant', 'content': 'A cyberpunk gnome with pale skin and cybernetic jade eyes, wearing a long tattered coat with circuitry patches and a sleek metallic pointed helmet. Surrounded by holographic screens and neon lights in a dim, cluttered workshop filled with futuristic gadgets and data screens.'}]}
        elif mode == 'custom':
            try:
                history = json.load(open(custom_history))
                return history
            except:
                raise Exception('Error loading custom history file')

    def api_request(self, prompt, server_address, server_port, seed, mode, custom_history):
        history = self.history(mode, custom_history)
        if mode == 'prompt':
            prompt = f'{prompt}, describe in detail.'
        if mode == 'descriptor':
            spice = ['a', 'the', 'this', 'that', 'an exotic', 'an interesting', 'a colorful', 'a vibrant', 'get creative!', 'think outside the box!', 'a rare', 'a standard', 'a typical', 'a common', 'a normal', 'a regular', 'a usual', 'an ordinary', 'a unique', 'a one of a kind', 'a special', 'a distinctive', 'a peculiar', 'a remarkable', 'a noteworthy', 'popular in the victorian era', 'popular in the 1920s', 'popular in the 1950s', 'popular in the 1980s', 'popular in the 1990s', 'popular in the 2000s', 'popular in the 2010s', 'popular in the 2020s', 'popular in asia', 'popular in europe', 'popular in north america', 'popular in south america', 'popular in africa', 'popular in australia', 'popular in the middle east', 'popular in the pacific islands', 'popular with young people', 'popular with the elderly', 'trending on social media', 'popular on tiktok', 'trending on pinterest', 'popular on instagram', 'popular on facebook', 'popular on twitter', 'popular on reddit', 'popular on youtube', 'popular on tumblr', 'popular on snapchat', 'popular on linkedin', 'popular on twitch', 'popular on discord', 'unusual example of', 'a classic', 'an underrated', 'an innovative', 'a historical', 'a modern', 'a contemporary', 'a futuristic', 'a traditional', 'an eco-friendly', 'a controversial', 'a political', 'a religious', 'a spiritual', 'a philosophical', 'a scientific']
            random.seed(seed)
            prompt = f'{random.choice(spice)} {prompt}'
        '\n        example curl request to LM Studio\n        curl http://localhost:1234/v1/chat/completions         -H "Content-Type: application/json"         -d \'{\n        "messages": [\n            { "role": "system", "content": "Always answer in rhymes." },\n            { "role": "user", "content": "Introduce yourself." }\n        ],\n        "temperature": 0.7,\n        "max_tokens": -1,\n        "stream": false\n        }\'\n        '
        history['messages'].append({'role': 'user', 'content': prompt})
        request = {'messages': history['messages'], 'temperature': 0.2, 'top_p': 0.95, 'presence_penalty': 0.0, 'frequency_penalty': 0.0, 'max_tokens': 1200, 'stream': False, 'seed': seed}
        HOST = f'{server_address}:{server_port}'
        URI = f'http://{HOST}/v1/chat/completions'
        try:
            response = requests.post(URI, json=request, timeout=60)
        except requests.exceptions.ConnectionError:
            raise Exception('Are you running LM Studio with server running?')
        if response.status_code == 200:
            result = response.json()['choices'][0]['message']['content']
            result = html.unescape(result)
            return result
        else:
            return 'Error'

    def process(self, input_prompt, mode, custom_history, server_address, server_port, seed, prompt=None, unique_id=None, extra_pnginfo=None):
        input_prompt = find_and_replace_wildcards(input_prompt, seed, debug=True)
        input_prompt = search_and_replace(input_prompt, extra_pnginfo, prompt)
        wc_re = re.compile('{([^}]+)}')

        def repl(m):
            return random.choice(m.group(1).split('|'))
        for m in wc_re.finditer(input_prompt):
            input_prompt = input_prompt.replace(m.group(0), repl(m))
        result = self.api_request(input_prompt, server_address, server_port, seed, mode, custom_history)
        prompt.get(str(unique_id))['inputs']['output_text'] = result
        return (result,)
```