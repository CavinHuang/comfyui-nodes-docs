# Documentation
- Class name: WAS_Text_Random_Prompt
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Random_Prompt类的`random_prompt`方法旨在根据给定的搜索种子生成一个随机文本提示，如果没有提供搜索种子，则使用一组默认提示。它使用外部API获取与查询相关的图像列表，并返回与列表中某个图像相关联的随机提示。

# Input types
## Required
- search_seed
    - 参数`search_seed`用于定义生成随机文本提示的初始查询。它至关重要，因为它直接影响生成的提示类型以及从外部API检索的后续图像。
    - Comfy dtype: STRING
    - Python dtype: Union[str, None]

# Output types
- prompt
    - 参数`prompt`代表`random_prompt`方法的输出，这是一个基于输入查询随机选择的文本提示。它很重要，因为它构成了对生成的提示进行的任何后续处理或分析的基础。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Random_Prompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'search_seed': ('STRING', {'multiline': False})}}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'random_prompt'
    CATEGORY = 'WAS Suite/Text'

    def random_prompt(self, search_seed=None):
        if search_seed in ['', ' ']:
            search_seed = None
        return (self.search_lexica_art(search_seed),)

    def search_lexica_art(self, query=None):
        if not query:
            query = random.choice(['portrait', 'landscape', 'anime', 'superhero', 'animal', 'nature', 'scenery'])
        url = f'https://lexica.art/api/v1/search?q={query}'
        try:
            response = requests.get(url, proxies=config.get_proxies())
            data = response.json()
            images = data.get('images', [])
            if not images:
                return '404 not found error'
            random_image = random.choice(images)
            prompt = random_image.get('prompt')
        except Exception:
            cstr('Unable to establish connection to Lexica API.').error.print()
            prompt = '404 not found error'
        return prompt
```