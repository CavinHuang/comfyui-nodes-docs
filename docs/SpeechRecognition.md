# Documentation
- Class name: SpeechRecognition
- Category: ♾️Mixlab/Audio
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

语音识别节点旨在将音频输入转换为文本。它在需要将口语转换为书面形式的应用中发挥关键作用，例如在语音命令系统或转录服务中。该节点的功能集中在其准确处理和解释音频信号的能力上，为用户提供了一个强大的语音转文本工具。

# Input types
## Required
- upload
    - ‘upload’参数对于语音识别节点至关重要，因为它是需要处理的音频数据的来源。这是一个必需的输入，它直接影响节点的操作和语音识别输出的质量。
    - Comfy dtype: AUDIOINPUTMIX
    - Python dtype: Union[str, bytes]
- start_by
    - ‘start_by’参数允许用户指定音频文件中语音识别过程的起始点。虽然它是可选的，但它可以通过将识别任务集中在音频的定部分来显著影响节点的执行，提高效率和准确性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- prompt
    - 语音识别节点的‘prompt’输出代表了从输入音频转录的文本。这是一个重要的结果，它包含了节点的主要功能，为用户提供了口语内容的文本表示。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SpeechRecognition:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upload': ('AUDIOINPUTMIX',)}, 'optional': {'start_by': ('INT', {'default': 0, 'min': 0, 'max': 2048, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Audio'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, upload, start_by):
        return {'ui': {'start_by': [start_by]}, 'result': (upload,)}
```