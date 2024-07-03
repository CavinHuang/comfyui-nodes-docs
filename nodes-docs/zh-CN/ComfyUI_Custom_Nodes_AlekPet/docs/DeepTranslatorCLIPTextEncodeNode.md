
# Documentation
- Class name: DeepTranslatorCLIPTextEncodeNode
- Category: AlekPet Nodes/conditioning
- Output node: False

DeepTranslatorCLIPTextEncodeNode是一个集成了翻译服务和CLIP文本编码功能的节点。它能够将文本输入翻译成不同语言，并将这些翻译结果编码成适合条件模型使用的格式。这个节点为需要同时进行翻译和文本编码的其他节点提供了基础功能，简化了为各种AI驱动应用准备文本的过程。

# Input types
## Required
- from_translate
    - 指定翻译的源语言，支持根据所选翻译服务的动态语言范围。这个参数在确定要翻译的文本的初始语言方面起着关键作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- to_translate
    - 定义翻译的目标语言，允许将文本转换为所选翻译服务支持的多种语言。这个参数对于指定翻译输出的目标语言至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- add_proxies
    - 指示是否为翻译服务启用代理使用，影响翻译请求的发送方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- proxies
    - 提供代理设置（如果启用了代理使用），通过指定的代理服务器促进翻译请求。
    - Comfy dtype: STRING
    - Python dtype: str
- auth_data
    - 包含某些翻译服务所需的授权数据，确保安全访问翻译功能。
    - Comfy dtype: STRING
    - Python dtype: str
- service
    - 指定要使用的翻译服务，允许在各种支持的翻译提供商中进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 要翻译和编码的文本输入。这个参数是节点功能的核心，作为经过翻译和后续文本编码的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 用于将翻译后的文本编码成与条件模型兼容的格式的CLIP模型实例。这个参数对于将翻译输出与下游AI处理集成至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Output types
- conditioning
    - 翻译文本的编码表示，格式化以用于条件模型。这个输出对于需要特定编码格式文本输入的应用至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, torch.Tensor]]
- string
    - 翻译后的文本，提供翻译过程的直接输出。这个输出对于理解或进一步处理翻译内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
