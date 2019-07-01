<?php

/* modules/contrib/feeds/templates/feeds_feed.html.twig */
class __TwigTemplate_f605f67403d41d9af226934ff85bc9d4664de67ec08cfa7ced3adfb085f60271 extends Twig_Template
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
        $tags = ["set" => 2];
        $filters = ["clean_class" => 4];
        $functions = [];

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                ['set'],
                ['clean_class'],
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

        // line 2
        $context["classes"] = [0 => "feeds_feed", 1 => ("feeds_feed--feed-type-" . \Drupal\Component\Utility\Html::getClass($this->getAttribute(        // line 4
($context["feed"] ?? null), "bundle", []))), 2 => (($this->getAttribute(        // line 5
($context["feed"] ?? null), "isActive", [], "method")) ? ("feeds_feed-active") : ("")), 3 => ((        // line 6
($context["view_mode"] ?? null)) ? (("feeds_feed--view-mode-" . \Drupal\Component\Utility\Html::getClass(($context["view_mode"] ?? null)))) : (""))];
        // line 9
        echo "
<article";
        // line 10
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method"), "html", null, true));
        echo ">
  <div";
        // line 11
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute(($context["content_attributes"] ?? null), "addClass", [0 => "feeds_feed__content"], "method"), "html", null, true));
        echo ">
    ";
        // line 12
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, ($context["content"] ?? null), "html", null, true));
        echo "
  </div>
</article>
";
    }

    public function getTemplateName()
    {
        return "modules/contrib/feeds/templates/feeds_feed.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  59 => 12,  55 => 11,  51 => 10,  48 => 9,  46 => 6,  45 => 5,  44 => 4,  43 => 2,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "modules/contrib/feeds/templates/feeds_feed.html.twig", "/app/web/modules/contrib/feeds/templates/feeds_feed.html.twig");
    }
}
