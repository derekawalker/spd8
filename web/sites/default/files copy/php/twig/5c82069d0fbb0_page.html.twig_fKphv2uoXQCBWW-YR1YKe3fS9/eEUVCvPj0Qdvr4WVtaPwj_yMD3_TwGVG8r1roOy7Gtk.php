<?php

/* themes/custom/saltproject/templatets/layout/page.html.twig */
class __TwigTemplate_7e8faed0ac3b2405ff22130fd33930fcc5fe7f0fc4e5da97fb99b0bddd5b0cb5 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $tags = ["if" => 64];
        $filters = [];
        $functions = [];

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                ['if'],
                [],
                []
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 45
        echo "<div class=\"layout-container\">
  ";
        // line 46
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "userbar", []), "html", null, true));
        echo "

  <header role=\"banner\">
    ";
        // line 49
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "header", []), "html", null, true));
        echo "
  </header>

  ";
        // line 52
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "banner", []), "html", null, true));
        echo "

  <main role=\"main\">
    <a id=\"main-content\" tabindex=\"-1\"></a>";
        // line 56
        echo "
    <div class=\"layout-columns\">
      <div class=\"layout-content\">
        ";
        // line 59
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "content_top", []), "html", null, true));
        echo "
        ";
        // line 60
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "content", []), "html", null, true));
        echo "
        ";
        // line 61
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "content_bottom", []), "html", null, true));
        echo "
      </div>";
        // line 63
        echo "  
      ";
        // line 64
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_first", [])) {
            // line 65
            echo "        <aside class=\"layout-sidebar-first\" role=\"complementary\">
          ";
            // line 66
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "sidebar_first", []), "html", null, true));
            echo "
        </aside>
      ";
        }
        // line 69
        echo "  
      ";
        // line 70
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_second", [])) {
            // line 71
            echo "        <aside class=\"layout-sidebar-second\" role=\"complementary\">
          ";
            // line 72
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "sidebar_second", []), "html", null, true));
            echo "
        </aside>
      ";
        }
        // line 75
        echo "    </div>";
        // line 76
        echo "
  </main>

  ";
        // line 79
        if (($this->getAttribute(($context["page"] ?? null), "footer", []) || $this->getAttribute(($context["page"] ?? null), "footer_banner", []))) {
            // line 80
            echo "    <footer role=\"contentinfo\">
      ";
            // line 81
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "footer_banner", []), "html", null, true));
            echo "
      ";
            // line 82
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["page"] ?? null), "footer", []), "html", null, true));
            echo "
    </footer>
  ";
        }
        // line 85
        echo "
</div>";
    }

    public function getTemplateName()
    {
        return "themes/custom/saltproject/templatets/layout/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  131 => 85,  125 => 82,  121 => 81,  118 => 80,  116 => 79,  111 => 76,  109 => 75,  103 => 72,  100 => 71,  98 => 70,  95 => 69,  89 => 66,  86 => 65,  84 => 64,  81 => 63,  77 => 61,  73 => 60,  69 => 59,  64 => 56,  58 => 52,  52 => 49,  46 => 46,  43 => 45,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "themes/custom/saltproject/templatets/layout/page.html.twig", "/app/web/themes/custom/saltproject/templatets/layout/page.html.twig");
    }
}
