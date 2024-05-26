# Documentation
- Class name: SpeechSynthesis
- Category: ♾️Mixlab/Audio
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点旨在将所提供的文本转换为类似人类的语音，使得应用程序能够以声音的形式与用户进行交流。它将文本数据转换为音频输出，便于创建互动性强且引人入胜的音频体验。

# Input types
## Required
- text
    - 文本参数对于节点的运行至关重要，因为它是语音合成的输入。它决定了生成语音的内容和上下文，直接影响节点的输出结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - 结果输出是合成的语音，这是使用此节点的主要目的。它代表了输入文本到可听格式的转换，准备好进行播放。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SpeechSynthesis:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'forceInput': True})}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (True,)
    CATEGORY = '♾️Mixlab/Audio'

    def run(self, text):
        return {'ui': {'text': text}, 'result': (text,)}
```