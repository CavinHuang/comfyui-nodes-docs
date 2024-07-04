
# Documentation
- Class name: `DeepTranslatorTextNode`
- Category: `AlekPet Nodes/text`
- Output node: `False`

DeepTranslatorTextNode是一个设计用于跨语言文本翻译的节点，它利用多种翻译服务。该节点抽象了选择和与翻译API交互的复杂性，为文本翻译提供了一个简化的接口，并支持可选的代理设置。

# Input types
## Required
- from_translate
    - 指定翻译的源语言，或设置为'auto'以根据文本内容自动检测语言。这在引导翻译过程中起着关键作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- to_translate
    - 定义翻译的目标语言，决定文本将被翻译成哪种语言。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- add_proxies
    - 一个标志，表示是否应将代理设置应用于翻译请求，使得在互联网访问受限的环境中也能进行翻译。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- proxies
    - 如果'add_proxies'设置为True，则提供代理配置详情，通过指定的代理服务器促进翻译请求。
    - Comfy dtype: STRING
    - Python dtype: dict
- auth_data
    - 包含某些翻译服务所需的身份验证数据，确保对其API的授权访问。
    - Comfy dtype: STRING
    - Python dtype: dict
- service
    - 选择要使用的翻译服务，如'GoogleTranslator'、'MyMemoryTranslator'等，允许灵活选择翻译提供商。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 需要翻译的文本，作为翻译过程的输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 翻译后的文本，提供翻译过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewTextNode](../../ComfyUI_Custom_Nodes_AlekPet/Nodes/PreviewTextNode.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
