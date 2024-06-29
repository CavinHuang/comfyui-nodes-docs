# Text Add Token by Input
## Documentation
- Class name: `Text Add Token by Input`
- Category: `WAS Suite/Text/Tokens`
- Output node: `True`

This node facilitates the addition of custom tokens to a text processing context, allowing for dynamic content manipulation. It supports specifying a token name and value, and optionally printing the current set of tokens for verification or debugging purposes.
## Input types
### Required
- **`token_name`**
    - The name of the token to be added. It is crucial for identifying the token within the text processing context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`token_value`**
    - The value associated with the token name. This value is substituted in place of the token name during text processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`print_current_tokens`**
    - A flag to indicate whether the current list of tokens should be printed. Useful for debugging or verification.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Add_Token_Input:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "token_name": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "token_value": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "print_current_tokens": (["false", "true"],),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "text_add_token"
    OUTPUT_NODE = True
    CATEGORY = "WAS Suite/Text/Tokens"

    def text_add_token(self, token_name, token_value, print_current_tokens="false"):

        if token_name.strip() == '':
            cstr(f'A `token_name` is required for a token; token name provided is empty.').error.print()
            pass

        # Token Parser
        tk = TextTokens()

        # Add Tokens
        tk.addToken(token_name, token_value)

        # Current Tokens
        if print_current_tokens == "true":
            cstr(f'Current Custom Tokens:').msg.print()
            print(json.dumps(tk.custom_tokens, indent=4))

        return (token_name, token_value)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
