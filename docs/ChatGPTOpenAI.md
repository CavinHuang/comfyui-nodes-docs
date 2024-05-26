# Documentation
- Class name: ChatGPTNode
- Category: ♾️Mixlab/GPT
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

ChatGPTNode 类旨在使用 OpenAI 提供的大型语言模型生成上下文感知文本。它管理会话历史以保持对话流程，从而允许更连贯和相关的响应。该节点擅长与各种模型和 API 集成，确保在不同应用场景中的灵活性和适应性。

# Input types
## Required
- api_key
    - API 密钥对于验证和授权访问语言模型服务至关重要。它在确保与 API 的安全通信中起着核心作用，使节点能够获取和处理语言模型的响应。
    - Comfy dtype: KEY
    - Python dtype: str
- api_url
    - API URL 指定了语言模型服务的端点。它对于将节点的请求指向正确的服务至关重要，影响节点与语言模型的交互以及从语言模型检索数据的能力。
    - Comfy dtype: URL
    - Python dtype: str
- prompt
    - 提示是语言模型用来生成响应的输入查询或语句。它是节点操作的关键元素，因为它直接影响生成文本的内容和方向。
    - Comfy dtype: STRING
    - Python dtype: str
- system_content
    - 系统内容为语言模型提供系统的指令或上下文，这可以影响生成响应的风格和语调。它是一个可选参数，可用于定制节点的行为。
    - Comfy dtype: STRING
    - Python dtype: str
- model
    - 模型参数选择节点使用的特定语言模型。它决定了语言模型交互的复杂性和能力，影响生成的响应的质量和类型。
    - Comfy dtype: COMBO[gpt-3.5-turbo, gpt-35-turbo, gpt-3.5-turbo-16k, gpt-3.5-turbo-16k-0613, gpt-4-0613, gpt-4-1106-preview, glm-4]
    - Python dtype: str
- seed
    - 种子为语言模型中使用的随机数生成提供了起始点。它可以用来通过确保模型的随机过程的一致初始状态来产生可重复的结果。
    - Comfy dtype: INT
    - Python dtype: int
- context_size
    - 上下文大小决定了节点在生成响应时将考虑的先前交换的数量。它影响对话上下文的深度和生成文本的相关性。
    - Comfy dtype: INT
    - Python dtype: int
- unique_id
    - 唯一 ID 是一个可选的标识符，可用于跟踪或引用与语言模型的特定交互。它不影响节点的执行，但可能对记录或调试目的有用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- extra_pnginfo
    - 额外的 PNG 信息是一个可选参数，可以为语言模型提供额外的上下文或数据。它的使用特定于某些应用程序，并且可以增强节点生成更详细或特定响应的能力。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str

# Output types
- text
    - 文本输出代表了语言模型对输入提示的响应。它是节点操作的主要结果，反映了节点生成连贯且上下文相关文本的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- messages
    - 消息输出是一个 JSON 格式的字符串，包含了当前响之前的对话历史。它包括系统指令、用户提示和助手回复，提供了交互的全面视图。
    - Comfy dtype: STRING
    - Python dtype: str
- session_history
    - 会话历史输出是一个 JSON 格式的字符串，记录了与语言模型的整个对话会话。它作为对话的记录，可用于分析或在多次交互中保持上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class ChatGPTNode:

    def __init__(self):
        self.session_history = []
        self.system_content = 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'api_key': ('KEY', {'default': '', 'multiline': True, 'dynamicPrompts': False}), 'api_url': ('URL', {'default': '', 'multiline': True, 'dynamicPrompts': False}), 'prompt': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'system_content': ('STRING', {'default': 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.', 'multiline': True, 'dynamicPrompts': False}), 'model': (['gpt-3.5-turbo', 'gpt-35-turbo', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-0613', 'gpt-4-0613', 'gpt-4-1106-preview', 'glm-4'], {'default': 'gpt-3.5-turbo'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'step': 1}), 'context_size': ('INT', {'default': 1, 'min': 0, 'max': 30, 'step': 1})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('text', 'messages', 'session_history')
    FUNCTION = 'generate_contextual_text'
    CATEGORY = '♾️Mixlab/GPT'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, False, False)

    def generate_contextual_text(self, api_key, api_url, prompt, system_content, model, seed, context_size, unique_id=None, extra_pnginfo=None):
        if system_content:
            self.system_content = system_content
        if is_azure_url(api_url):
            client = azure_client(api_key, api_url)
        elif model == 'glm-4':
            client = ZhipuAI_client(api_key)
            print('using Zhipuai interface')
        else:
            client = openai_client(api_key, api_url)
            print('using ChatGPT interface')

        def crop_list_tail(lst, size):
            if size >= len(lst):
                return lst
            elif size == 0:
                return []
            else:
                return lst[-size:]
        session_history = crop_list_tail(self.session_history, context_size)
        messages = [{'role': 'system', 'content': self.system_content}] + session_history + [{'role': 'user', 'content': prompt}]
        response_content = chat(client, model, messages)
        self.session_history = self.session_history + [{'role': 'user', 'content': prompt}] + [{'role': 'assistant', 'content': response_content}]
        return (response_content, json.dumps(messages, indent=4), json.dumps(self.session_history, indent=4))
```