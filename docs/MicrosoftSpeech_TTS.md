# Documentation
- Class name: Text2AudioEdgeTts
- Category: 😺dzNodes
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_MSSpeech_TTS

Text2AudioEdgeTts节点旨在使用edge_tts库将文本转换为音频文件。它接受文本、一个声音参数以及一个可选的速率调整，以生成可以用于各种应用（如语音助手或有声读物）的音频文件。该节点的主要目标是提供一个既高效又可定制的文本到语音的转换过程。

# Input types
## Required
- voice
    - 声音参数对于确定生成音频的声音特征至关重要。它从edge_tts库中预定义的声音集中选择特定的声音，这显著影响输出的质量和音调。
    - Comfy dtype: STRING
    - Python dtype: str
- text
    - 文本参数是要转换为音频的输入文本。它是节点处理以生成所需音频输出的核心内容。文本的质量直接影响转换的有效性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- rate
    - 速率参数允许调整语速。它可以设置为负值以减慢语速，或正值以加快语速。这个特性对于微调音频输出以满足特定要求或偏好很重要。
    - Comfy dtype: INT
    - Python dtype: int
- filename_prefix
    - 文件名前缀用于为输出音频文件创建唯一标识符。在组织和管理多个音频文件时特别有用，因为它确保每个文件都有一个独特且可识别的名称。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- MP3 file
    - Text2AudioEdgeTts节点的输出是一个MP3文件，其中包含从输入文本生成的音频。这个文件很重要，因为它代表了节点文本到语音转换过程的成果，并且可以用于各种下游应用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class Text2AudioEdgeTts:

    def __init__(self):
        self.output_dir = os.path.join(folder_paths.get_output_directory(), 'audio')
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    @classmethod
    def INPUT_TYPES(cls):
        VOICES = list(voice_dict.keys())
        return {'required': {'voice': (VOICES,), 'rate': ('INT', {'default': 0, 'min': -200, 'max': 200}), 'filename_prefix': ('STRING', {'default': 'comfyUI'}), 'text': ('STRING', {'multiline': True})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('MP3 file: String',)
    FUNCTION = 'text_2_audio'
    OUTPUT_NODE = True
    CATEGORY = '😺dzNodes'

    def text_2_audio(self, voice, filename_prefix, text, rate):
        voice_name = voice_dict[voice]
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        _datetime = datetime.datetime.now().strftime('%Y%m%d')
        _datetime = _datetime + datetime.datetime.now().strftime('%H%M%S%f')
        file = f'{filename}_{_datetime}_{voice_name}.mp3'
        audio_path = os.path.join(full_output_folder, file)
        _rate = str(rate) + '%' if rate < 0 else '+' + str(rate) + '%'
        print(f"# 😺dzNodes: MSSpeech TTS: Generating voice files, voice=‘{voice_name}’, rate={rate}, audiofile_path='{audio_path}, 'text='{text}'")
        asyncio.run(gen_tts(text, voice_name, _rate, audio_path))
        return {'ui': {'text': 'Audio file：' + os.path.join(full_output_folder, file), 'audios': [{'filename': file, 'type': 'output', 'subfolder': 'audio'}]}, 'result': (audio_path,)}
```